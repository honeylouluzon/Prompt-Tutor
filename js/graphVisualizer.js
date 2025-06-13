// js/graphVisualizer.js

const GraphVisualizer = {
    graph: null,
    simulation: null,
    svg: null,
    container: null,

    init(containerId) {
        this.container = document.getElementById(containerId);
        this.initializeSVG();
        this.initializeSimulation();
        this.initializeControls();
    },

    initializeSVG() {
        // Clear existing content
        this.container.innerHTML = '';
        
        // Create SVG element
        this.svg = d3.select(this.container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%');

        // Add zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                this.svg.select('g').attr('transform', event.transform);
            });

        this.svg.call(zoom);
        this.svg.append('g');

        // Add arrow marker for directed edges
        this.svg.append('defs').append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '-0 -5 10 10')
            .attr('refX', 20)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', '#999');
    },

    initializeSimulation() {
        this.simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-200))
            .force('center', d3.forceCenter(
                this.container.clientWidth / 2,
                this.container.clientHeight / 2
            ))
            .force('collision', d3.forceCollide().radius(30));
    },

    initializeControls() {
        const controls = document.createElement('div');
        controls.className = 'graph-controls';
        controls.innerHTML = `
            <button id="filterTopics">Topics</button>
            <button id="filterEntities">Entities</button>
            <button id="filterStyles">Styles</button>
            <button id="resetGraph">Reset</button>
        `;
        this.container.parentNode.insertBefore(controls, this.container);

        // Bind event listeners
        controls.querySelector('#filterTopics').addEventListener('click', () => 
            this.filterNodes('topic'));
        controls.querySelector('#filterEntities').addEventListener('click', () => 
            this.filterNodes('entity'));
        controls.querySelector('#filterStyles').addEventListener('click', () => 
            this.filterNodes('style'));
        controls.querySelector('#resetGraph').addEventListener('click', () => 
            this.resetView());
    },

    updateGraph(data) {
        const nodes = data.nodes;
        const links = data.edges;

        // Update simulation
        this.simulation.nodes(nodes);
        this.simulation.force('link').links(links);

        // Create edges
        const link = this.svg.select('g')
            .selectAll('.link')
            .data(links)
            .join('line')
            .attr('class', 'link')
            .attr('marker-end', 'url(#arrowhead)');

        // Create nodes
        const node = this.svg.select('g')
            .selectAll('.node')
            .data(nodes)
            .join('g')
            .attr('class', 'node')
            .call(this.drag());

        // Add circles to nodes
        node.append('circle')
            .attr('r', 10)
            .attr('fill', d => this.getNodeColor(d.type));

        // Add labels to nodes
        node.append('text')
            .text(d => d.label)
            .attr('x', 15)
            .attr('y', 5);

        // Update positions on tick
        this.simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Restart simulation
        this.simulation.alpha(1).restart();
    },

    getNodeColor(type) {
        const colors = {
            topic: '#ff7f0e',
            entity: '#1f77b4',
            style: '#2ca02c',
            prompt: '#d62728'
        };
        return colors[type] || '#999';
    },

    drag() {
        return d3.drag()
            .on('start', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on('end', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });
    },

    filterNodes(type) {
        const nodes = this.simulation.nodes();
        const links = this.simulation.force('link').links();

        const filteredNodes = nodes.filter(node => node.type === type);
        const filteredLinks = links.filter(link => 
            link.source.type === type || link.target.type === type
        );

        this.updateGraph({ nodes: filteredNodes, edges: filteredLinks });
    },

    resetView() {
        const graph = DataManager.loadKnowledgeGraph();
        this.updateGraph(graph);
    },

    resize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.svg
            .attr('width', width)
            .attr('height', height);

        this.simulation.force('center',
            d3.forceCenter(width / 2, height / 2)
        );
        
        this.simulation.alpha(1).restart();
    }
};

// Add window resize handler
window.addEventListener('resize', () => {
    GraphVisualizer.resize();
});