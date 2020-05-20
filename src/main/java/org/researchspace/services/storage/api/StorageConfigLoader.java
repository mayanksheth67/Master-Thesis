/**
 * ResearchSpace
 * Copyright (C) 2020, © Trustees of the British Museum
 * Copyright (C) 2015-2019, metaphacts GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package org.researchspace.services.storage.api;

import static org.researchspace.config.ConfigurationUtil.createEmptyConfig;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;

import org.apache.commons.configuration2.Configuration;
import org.apache.commons.configuration2.PropertiesConfiguration;
import org.apache.commons.configuration2.SystemConfiguration;
import org.apache.commons.configuration2.ex.ConfigurationException;
import org.apache.commons.configuration2.io.FileHandler;
import org.apache.commons.lang.StringUtils;

import com.google.inject.Injector;

public class StorageConfigLoader {

    private final StorageRegistry storageRegistry;
    private final Injector injector;

    public StorageConfigLoader(StorageRegistry storageRegistry, Injector injector) {
        this.storageRegistry = storageRegistry;
        this.injector = injector;
    }

    /**
     * Reads storage configuration from system variables (-Dconfig.storage.foo=...)
     */
    public LinkedHashMap<String, StorageConfig> readSystemStorageConfig() {
        return parseStorageConfigs(new SystemConfiguration());
    }

    /**
     * Reads storage configuration from "org/researchspace/app/internalStorage.prop"
     * in the classpath resources which is generated at the compile time.
     */
    public LinkedHashMap<String, StorageConfig> readInternalStorageConfig(ClassLoader classLoader, boolean isDev)
            throws StorageConfigException {
        URL internalConfigUrl;

        // setup help, admin and assets storage in development mutable mode,
        // in production they are available from immutable classpath storage
        if (isDev) {
            internalConfigUrl = classLoader.getResource("org/researchspace/apps/internalStorageDev.prop");
        } else {
            internalConfigUrl = classLoader.getResource("org/researchspace/apps/internalStorage.prop");
        }

        if (internalConfigUrl == null) {
            throw new StorageConfigException("Unable to find internal storage config");
        }

        try (InputStream is = internalConfigUrl.openStream()) {
            return this.readStorageConfigFromStream(is);
        } catch (IOException | ConfigurationException e) {
            throw new StorageConfigException("Unable to read internal storage config", e);
        }
    }

    public LinkedHashMap<String, StorageConfig> readStorageConfigFromStream(InputStream is)
            throws ConfigurationException {
        PropertiesConfiguration config = createEmptyConfig();
        FileHandler handler = new FileHandler(config);
        handler.load(is);
        return parseStorageConfigs(config);
    }

    private LinkedHashMap<String, StorageConfig> parseStorageConfigs(Configuration config) {
        Configuration allStoragesSubset = config.subset("config.storage");

        HashSet<String> storageIds = new HashSet<>();
        List<String> orderedIds = new ArrayList<>();

        allStoragesSubset.getKeys().forEachRemaining(key -> {
            String storageId = StringUtils.substringBefore(key, ".");
            if (storageIds.add(storageId)) {
                orderedIds.add(storageId);
            }
        });

        LinkedHashMap<String, StorageConfig> configs = new LinkedHashMap<>();
        for (String storageId : orderedIds) {
            Configuration properties = allStoragesSubset.subset(storageId);
            String storageType = properties.getString("type");
            if (storageType == null) {
                throw new StorageConfigException("Missing property 'type' for storage '" + storageId + "'");
            }

            StorageFactory factory = storageRegistry.get(storageType)
                    .orElseThrow(() -> new StorageConfigException("Unknown storage type '" + storageType + "'"));

            injector.injectMembers(factory);

            StorageConfig parsedConfig = factory.parseStorageConfig(storageType, properties);
            try {
                parsedConfig.validate();
            } catch (StorageConfigException e) {
                throw new StorageConfigException(
                        "Invalid configuration for storage ID '" + storageId + "'. Details: " + e.getMessage(), e);
            }
            configs.put(storageId, parsedConfig);
        }

        return configs;
    }
}
