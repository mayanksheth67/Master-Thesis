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

package org.researchspace.vocabulary;

import org.eclipse.rdf4j.model.IRI;
import org.eclipse.rdf4j.model.ValueFactory;
import org.eclipse.rdf4j.model.impl.SimpleValueFactory;

/**
 * @author ArtemKozlov <ak@metaphacts.com>
 */
public class FIELDS {

    public static final String NAMESPACE = "http://www.researchspace.org/resource/system/fields/";

    /**
     * Types
     */
    public static final IRI FIELD_TYPE;

    /**
     * Predicates
     */
    public static final IRI MIN_OCCURS;
    public static final IRI MAX_OCCURS;
    public static final IRI XSD_DATATYPE;
    public static final IRI DOMAIN;
    public static final IRI RANGE;
    public static final IRI DEFAULT_VALUE;
    public static final IRI SELECT_PATTERN;
    public static final IRI INSERT_PATTERN;
    public static final IRI DELETE_PATTERN;
    public static final IRI ASK_PATTERN;
    public static final IRI AUTOSUGGESTION_PATTERN;
    public static final IRI VALUE_SET_PATTERN;
    public static final IRI TREE_PATTERNS;

    static {
        ValueFactory vf = SimpleValueFactory.getInstance();
        FIELD_TYPE = vf.createIRI(NAMESPACE, "Field");
        MIN_OCCURS = vf.createIRI(NAMESPACE, "minOccurs");
        MAX_OCCURS = vf.createIRI(NAMESPACE, "maxOccurs");
        XSD_DATATYPE = vf.createIRI(NAMESPACE, "xsdDatatype");
        DOMAIN = vf.createIRI(NAMESPACE, "domain");
        RANGE = vf.createIRI(NAMESPACE, "range");
        DEFAULT_VALUE = vf.createIRI(NAMESPACE, "defaultValue");
        SELECT_PATTERN = vf.createIRI(NAMESPACE, "selectPattern");
        INSERT_PATTERN = vf.createIRI(NAMESPACE, "insertPattern");
        DELETE_PATTERN = vf.createIRI(NAMESPACE, "deletePattern");
        ASK_PATTERN = vf.createIRI(NAMESPACE, "askPattern");
        AUTOSUGGESTION_PATTERN = vf.createIRI(NAMESPACE, "autosuggestionPattern");
        VALUE_SET_PATTERN = vf.createIRI(NAMESPACE, "valueSetPattern");
        TREE_PATTERNS = vf.createIRI(NAMESPACE, "treePatterns");
    }

}
