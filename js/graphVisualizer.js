// js/graphVisualizer.js

const GraphVisualizer = {
    graph: null,
    container: null,

    init(containerId) {
        this.container = document.getElementById(containerId);
        this.initializeGraph();
    },

    initializeGraph() {
        // Initialize graph visualization (using D3.js or similar)
        // This is a placeholder - actual implementation would use a visualization library
        this.graph = {
            nodes: [],
            edges: []
        };
    },

    addNode(data) {
        // Add a node to the graph
        this.graph.nodes.push({
            id: data.id,
            type: data.type, // 'topic', 'entity', or 'prompt'
            label: data.label,
            properties: data.properties || {}
        });
        this.updateVisualization();
    },

    addEdge(source, target, type) {
        // Add an edge between nodes
        this.graph.edges.push({
            source,
            target,
            type
        });
        this.updateVisualization();
    },

    updateVisualization() {
        // Update the graph visualization
        // This would use D3.js or similar to render the graph
        this.renderGraph();
    },

    renderGraph() {
        // Implement actual graph rendering using D3.js or similar
        // This is a placeholder for the actual visualization code
    },

    filterByType(type) {
        // Filter graph to show only nodes of specific type
        const filteredNodes = this.graph.nodes.filter(node => node.type === type);
        const filteredEdges = this.graph.edges.filter(edge => {
            const sourceNode = this.graph.nodes.find(n => n.id === edge.source);
            const targetNode = this.graph.nodes.find(n => n.id === edge.target);
            return sourceNode.type === type || targetNode.type === type;
        });

        this.renderFilteredGraph(filteredNodes, filteredEdges);
    },

    renderFilteredGraph(nodes, edges) {
        // Render the filtered graph
        // This would be implemented using the chosen visualization library
    },

    exportGraphData() {
        return {
            nodes: this.graph.nodes,
            edges: this.graph.edges
        };
    },

    importGraphData(data) {
        this.graph = data;
        this.updateVisualization();
    }
};