import heapq # priority queue
from collections import defaultdict # dictionary of lists

# class that represents a priority queue
class PriorityQueue:

    def __init__(self):
        self._queue = []
        self._index = 0

    def insert(self, item, priority):
        heapq.heappush(self._queue, (priority, self._index, item))
        self._index += 1

    def remove(self):
        return heapq.heappop(self._queue)[-1]

    def isEmpty(self):
        return len(self._queue) == 0

    def getSize(self):
        return self._index


# class that represents a node
class Node:

    # "key" is the identifier of node
    # "forward_cost" is h(n) (cost of the heuristic)
    # "forward_cost" is used in the calculate of "A* search": f(n) = g(n) + h(n) where
    # h(n) is the forward cost and g(n) is the backward cost
    # remember: "A* search" is the combination of Uniform-cost (UCS) and Greedy
    def __init__(self, key, forward_cost):
        self.key = key
        self.forward_cost = forward_cost

    def getKey(self):
        return self.key

    def getForwardCost(self):
        return self.forward_cost


# class that represents a graph
class Graph:

    def __init__(self):
        self.nodes = {} # dictionary of the nodes
        self.edges = [] # list of 3-tuple (source, destination, weight)
        self.path = [] # path

        # dictionary with the lists of successors of each node, faster for get the successors
        # each item of list is a 2-tuple: (destination, weight)
        self.successors = defaultdict(list)


    # function that adds edges
    def addEdge(self, source, destination, weight):
        edge = (source, destination, weight) # creates tuple (3-tuple)
        if not self.existsEdge(edge): # adds edge if not exists
            self.nodes[source], self.nodes[destination] = source, destination # adds the nodes
            self.edges.append(edge) # adds edge
            self.successors[source.getKey()].append((destination, weight)) # adds successor
        else:
            print('Error: edge (%s -> %s with weight %s) already exists!!' \
                % (edge[0].getKey(), edge[1].getKey(), edge[2]))


    # function that checks if edge exists
    def existsEdge(self, edge):
        for e in self.edges:
            # compares source's key, destionation's key and weight of edge
            if e[0].getKey() == edge[0].getKey() and \
                e[1].getKey() == edge[1].getKey() and e[2] == edge[2]:
                return True
        return False


    # function that returns the path
    def getPath(self):
        return self.path


    # function that run the "A*" algorithm
    def executeAStar(self, initial_node, goal_node):
        if not self.edges:
            print('Error: graph not contains edges!!')
        else:
            # checks if both the nodes exists
            if initial_node in self.nodes and goal_node in self.nodes:
                if initial_node == goal_node: # checks if are the same nodes
                    return 0

                queue = PriorityQueue() # creates a priority queue (min heap)

                # "distance_vector" and "antecessors" are used for reconstruct the path
                distance_vector, antecessors = {}, {}
                for node in self.nodes:
                    distance_vector[node.getKey()] = None # initializes with None
                    antecessors[node.getKey()] = None
                distance_vector[initial_node.getKey()] = 0

                # calculates costs
                g_cost, h_cost = 0, initial_node.getForwardCost()
                f_cost = g_cost + h_cost
                queue.insert((initial_node, g_cost, h_cost), f_cost)
                total_cost = None

                while True:
                    # a item of the queue is a 3-tuple: (current_node, g_cost, h_cost)
                    current_node, g_cost, h_cost = queue.remove()

                    # gets all the successors of "current_node"
                    successors = self.successors[current_node.getKey()]

                    for successor in successors:
                        destination, weight = successor # unpack 2-tuple successor

                        # calculates costs
                        new_g_cost = g_cost + weight
                        h_cost = destination.getForwardCost()
                        f_cost = new_g_cost + h_cost
                        print(destination.getKey())
                        queue.insert((destination, new_g_cost, h_cost), f_cost)

                        # updates "distance_vector"
                        if distance_vector[destination.getKey()]:
                            if distance_vector[destination.getKey()] > new_g_cost:
                                distance_vector[destination.getKey()] = new_g_cost
                                antecessors[destination.getKey()] = current_node.getKey()
                        else:
                            distance_vector[destination.getKey()] = new_g_cost
                            antecessors[destination.getKey()] = current_node.getKey()

                        # verifies that reached the goal
                        if destination.getKey() == goal_node.getKey():
                            # updated "total_cost"
                            if not total_cost:
                                total_cost = f_cost
                            elif f_cost < total_cost:
                                total_cost = f_cost

                    if queue.isEmpty(): # verifies if the queue is empty
                        # reconstruct the path
                        curr_node = goal_node.getKey()
                        while curr_node:
                            self.path.append(curr_node)
                            curr_node = antecessors[curr_node]
                        self.path = self.path[::-1]
                        return total_cost
            else:
                print('Error: the node(s) not exists in the graph!!')

a95 = Node('a95', 2)
a86 = Node('a86', 1)
a85 = Node('a85', 1)
a84 = Node('a84', 2)
a83 = Node('a83', 3)
a75 = Node('a75', 2)
a74 = Node('a74', 3)
a73 = Node('a73', 4)
a64 = Node('a64', 4)
a63 = Node('a63', 5)
a53 = Node('a53', 6)
a52 = Node('a52', 7)
a51 = Node('a51', 8)
a50 = Node('a50', 9)
a43 = Node('a43', 7)
a42 = Node('a42', 8)
a41 = Node('a41', 9)
a40 = Node('a40', 10)
a33 = Node('a33', 8)
a32 = Node('a32', 9)
a31 = Node('a31', 10)
a23 = Node('a23', 9)
a22 = Node('a22', 10)
a21 = Node('a21', 11)
a20 = Node('a20', 12)
a11 = Node('a11', 12)

graph2 = Graph()
graph2.addEdge(a11, a21, 1)
graph2.addEdge(a20, a21, 1)
graph2.addEdge(a21, a22, 1)
graph2.addEdge(a21, a31, 1)
graph2.addEdge(a22, a23, 1)
graph2.addEdge(a22, a32, 1)
graph2.addEdge(a23, a33, 1)
graph2.addEdge(a31, a32, 1)
graph2.addEdge(a31, a42, 1)
graph2.addEdge(a32, a33, 1)
graph2.addEdge(a32, a42, 1)
graph2.addEdge(a33, a43, 1)
graph2.addEdge(a40, a41, 1)
graph2.addEdge(a40, a50, 1)
graph2.addEdge(a41, a42, 1)
graph2.addEdge(a41, a51, 1)
graph2.addEdge(a42, a43, 1)
graph2.addEdge(a42, a52, 1)
graph2.addEdge(a43, a53, 1)
graph2.addEdge(a50, a51, 1)
graph2.addEdge(a51, a50, 1)
graph2.addEdge(a51, a52, 1)
graph2.addEdge(a52, a53, 1)
graph2.addEdge(a53, a63, 1)
graph2.addEdge(a63, a64, 1)
graph2.addEdge(a63, a73, 1)
graph2.addEdge(a64, a74, 1)
graph2.addEdge(a73, a74, 1)
graph2.addEdge(a73, a83, 1)
graph2.addEdge(a74, a75, 1)
graph2.addEdge(a74, a84, 1)
graph2.addEdge(a75, a85, 1)
graph2.addEdge(a83, a84, 1)
graph2.addEdge(a84, a85, 1)
graph2.addEdge(a85, a86, 1)
graph2.addEdge(a85, a95, 1)

total_cost = graph2.executeAStar(a11, a86)
path = graph2.getPath()
if total_cost:
    print('Total custo: %s. Caminho: %s' % (total_cost, ' -> '.join(path)))
else:
    print('Did not reach the goal!')