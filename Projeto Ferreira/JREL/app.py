class App(object):
    def __init__(self,edgesInput,nodesInput):
        from models import Graph,Node,AStar
        g=Graph()
        
        nodes=[]
        for node in nodesInput:
            g.addNode(Node(node[0],node[1]))
            
        for edge in edgesInput:
            g.addEdge(edge[0],edge[1],edge[2])
        
        AStar(g).resolve("a11","a21")
        
if __name__ == '__main__':
    App(hg,sg)