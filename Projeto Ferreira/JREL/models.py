import queue as Q

class Node:
    def __init__(self,key,weigth):
        self._key = key
        self._weigth = weigth
        
    def getKey(self):
        return self._key
        
    def getWeigth(self):
        return self._weigth

    def __repr__(self):
        return "#%s (%s)"% (self._key, self._weigth)

class Edge:
    def __init__(self,source, destination, weight):
        self._source=source
        self._destination=destination
        self._weight=weight
    
    def getWeigth(self):
        return self._weigth
        
    def getDestination(self):
        return self._destination
    
    def __lt__(self, other):
        return self._weight < other._weight
       
class Graph:
    def __init__(self):
        self._nodes = {} 
        self._edges = []
        self._successors= {}

    # function that adds edges
    def addEdge(self,source, destination, weight):
        edge = Edge(self._nodes[source], self._nodes[destination], weight) 
        
        if not self.existsEdge(edge): # adds edge if not exists
            self._edges.append(edge) # adds edge
            
            if not source in  self._successors:
                self._successors[source] =  Q.PriorityQueue()
            
            self._successors[source].put(edge) # adds successor
            
        else:
            print('Error: edge (%s -> %s with weight %s) already exists!!' % (source.getKey(), destination.getKey(), weight))

    # function that checks if edge exists
    def existsEdge(self, edge):
        return edge in self._edges

    def addNode(self,node):
        self._nodes[node.getKey()]=node
        
    def getNode(self, key):
        return self._nodes[key]
        
    def getSucesors(self,key):
        return self._successors[key]

    def __repr__(self):
        return str("%s | %s " % (self._nodes , self._edges ))
        
        
class AStar:
    def __init__(self,graph):
        self._graph=graph
        
    def resolve(self,startNode,toNode):
        node_start=  self._graph.getNode(startNode)
        OPEN = Q.PriorityQueue()
        OPEN.put(node_start)
        
        
        while not OPEN.qsize() == 0 :
            current_node = OPEN.get()
            
            if current_node.getKey() == toNode
                break
            
            for weigth_to_sucessor in self._graph.getSucesors(current_node):
                successor_current_cost = node_current.getWeigth() + weigth_to_sucessor.getWeigth()
                
                if weigth_to_sucessor.getDestination() in OPEN:
                    
        
        
        
        

            