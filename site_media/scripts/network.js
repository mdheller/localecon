var redraw, g, renderer;

/* only do all this when document has finished loading (needed for RaphaelJS) */
window.onload = function() {
    
    var width = $(document).width();
    var height = $(document).height() - 100;
	
	   var render = function(r, n) {
            /* the Raphael set is obligatory, containing all you want to display */
            var set = r.set().push(
                /* custom objects go here */
                r.rect(n.point[0]-30, n.point[1]-13, 60, 44).attr({"fill": "#feb", r : "12px", "stroke-width" : n.distance == 0 ? "3px" : "1px" })).push(
                r.text(n.point[0], n.point[1] + 10, (n.label || n.id)));
            return set;
        };
    
    g = new Graph();
	

	{% for node in nodes %}
		g.addNode( "{{ node.node_id }}", {label: "{{ node.name }}", render:render } );
	{% endfor %}

	{% for node in nodes %}
		{% for nx in node.next %}
			g.addEdge( "{{ node.node_id}}" , "{{ nx.node_id }}", { directed : true } );
		{% endfor %}
	{% endfor %}
 
    /* layout the graph using the Spring layout implementation */
    var layouter = new Graph.Layout.Spring(g);
    
    /* draw the graph using the RaphaelJS draw implementation */
    renderer = new Graph.Renderer.Raphael('canvas', g, width, height);
    
    redraw = function() {
        layouter.layout();
        renderer.draw();
    };

};