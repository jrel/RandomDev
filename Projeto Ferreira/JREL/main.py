import math

class Node:
    def __init__(self,key):
        self._key = key
        self._successor = []        
    def addSuccessor(self,successor):
        self._successor.append(successor)    
    def key(self):
        return self._key        
    def successor(self):
        return self._successors
        
    def __str__(self):
        return self._key
        
    def __eq__(self,other):
        self._key = other._key 
        
class NodePeso:
    def __init__(self,node):
        self._node = node
        self._peso = math.inf
    
    def peso(self):
        return self._peso
        
    def peso(self,peso):
        self._peso = peso
        
    def key(self):
        return self._node.key()
        
    def addSuccessor(self,successor):
        self._node._successor.append(successor)    
   
   
    def successor(self):
        return self._node._successors
    
        
        
class Edge:
    def __init__(self,source, destination):
        self._source=source
        self._destination=destination
    def source(self):
        return self._source
    def destination(self):
        return self._destination
        
    def __eq__(self,other):
        if self._source == other._source: 
            return self._destination == other._destination
        
        if self._source == other._destination:
            return self._destination == other._source
            
        return False

class Graph:
    def __init__(self):
        self._nodes = {} 
    def addEdge(self,source, destination):
        edge1 = Edge(self._nodes[source], self._nodes[destination]) 
        edge2 = Edge(self._nodes[destination], self._nodes[source])
     
        self._nodes[source].addSuccessor(edge1)
        self._nodes[destination].addSuccessor(edge1)
        
        self._nodes[source].addSuccessor(edge2)
        self._nodes[destination].addSuccessor(edge2)
        
    
    def node(self,node):
        return self._nodes[node]
    
    def addNode(self,node):
        self._nodes[node.key()]=node

class AStar:
    def __init__(self,graph):
        self._graph = graph
    
    def resolve(self,start,destination):
        OPEN = []
        startNode= self._graph.node(start)
        startNode.peso(0)
        OPEN.append(startNode)
        CLOSE = []
       

        while not len(OPEN ) == 0:
            node = OPEN.pop(0)
            
            for sucessor in node.successor():
                peso_sucessor = 1 + node.peso()
               
                if node in OPEN:
                    if  peso_sucessor < sucessor.peso():
                        successor.peso(peso_sucessor)
                        OPEN.append(successor)
                elif  node in CLOSE:
                    if  peso_sucessor < sucessor.peso():
                        successor.peso(peso_sucessor)
                        OPEN.append(successor)
                        CLOSE.remove(successor)
                    
                else:
                    OPEN.append((peso+1,sucessor))
               
                CLOSE.append(node)
                print(node)
            

        
        
        
g= Graph()
g.addNode(NodePeso(Node("a1")))
g.addNode(NodePeso(Node("a2")))
g.addNode(NodePeso(Node("a3")))
g.addEdge("a1","a2")
g.addEdge("a2","a3")
AStar(g).resolve("a1","a3")


