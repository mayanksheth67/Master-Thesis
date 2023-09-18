import csv
from rdflib import Graph, Literal, RDF, URIRef
from rdflib.serializer import Serializer

class CSVToRDFConverter:

    dataFileRootPath = 'C:\\Users\\GandhihA\\source\\repos\\Master-Thesis\\researchspace\\runtime-data\\file\\data\\'
    mappingFileRootPath = 'C:\\Users\\GandhihA\\source\\repos\\Master-Thesis\\researchspace\\runtime-data\\file\\mapping\\'
    rdfFileRootPath = 'C:\\Users\\GandhihA\\source\\repos\\Master-Thesis\\researchspace\\runtime-data\\file\\rdfOutput\\'

    def get_column_names(self, dataFileName):
        dataFilePath = self.dataFileRootPath + dataFileName

        with open(dataFilePath, 'r', encoding='utf-8') as data:
                
                dataLines = csv.DictReader(data)
                headers = dataLines.fieldnames

        return headers

    def create_rdf_file(self, dataFileName, mappingFileName):

        dataFilePath = self.dataFileRootPath + dataFileName
        mappingFilePath = self.mappingFileRootPath + mappingFileName
        outputFilePath = self.rdfFileRootPath + 'output.trig'

        g = Graph()

        # Load the mapping file
        with open(mappingFilePath, 'r') as mapping:
            mappings = csv.DictReader(mapping)

            # Load the data file        
            with open(dataFilePath, 'r', encoding='utf-8') as data:
                dataLines = csv.DictReader(csv)
                
                for mapping in mappings:
                
                    for row in dataLines:   
                        subject = URIRef(row[mapping['subject']])
                        predicate = URIRef(mapping['predicate'])
                        object = Literal(row[mapping['object']])
                        g.add((subject, predicate, object))
                    
                    data.seek(0)
                    next(dataLines)
        
        g.serialize(destination=outputFilePath, format='trig', encoding = 'utf-8')
         
# obj = CSVToRDFConverter()
# print(obj.get_column_names('data.csv'))