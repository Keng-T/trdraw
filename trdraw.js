(function($) {

	$.fn.trdraw = function(options){

		var settings = $.extend({
			color: 'black',
			thickness: '2',
			width: 200,
			height: 200,
			readonly: false,
			clear_text: "clear",
    }, options);
		
		return this.each(function(){

			if($(this).hasClass('trdraw')) return;
			$(this).addClass('trdraw');

			var currentPath;
			var rect;

			var $drawpad = $(`<svg width=${settings.width} height=${settings.height} viewBox='0 0 ${settings.width} ${settings.height}' xmlns='http://www.w3.org/2000/svg' style='border:1px solid #888;background-color:#fff;vertical-align:top;'></svg>`).appendTo(this);

			if(!settings.readonly){

				$drawpad
				.on('mousedown', (e) => {
					if(e.which === 1){
						currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
						currentPath.setAttribute('stroke', settings.color);
						currentPath.setAttribute('stroke-width', settings.thickness);
						currentPath.setAttribute('fill', 'none');
						$drawpad.append(currentPath);
						rect = e.target.getBoundingClientRect();
					}
				})
				.on('mouseup', () => {
					currentPath = null;
					var drawing = [];
					$drawpad.find('path').each(function(){
						let path = {};
						for(let i = 0; i < this.attributes.length; i++){
							path[this.attributes[i].name] = this.attributes[i].value;
						}
						drawing.push(path);
					});
					$input.val(JSON.stringify(drawing));
				})
				.on('mousemove', (e) => {
					if(!currentPath) return;
					const x = e.clientX - rect.left;
					const y = e.clientY - rect.top;

					let d = currentPath.getAttribute('d');
					currentPath.setAttribute('d', d ? d + ` L${x},${y}` : `M${x},${y}`);
				});


				$('<button>',{
					type: 'button',
					class: 'btn btn-danger',
					html: settings.clear_text,
				}).appendTo(this)
				.on('click', function(){
					$drawpad.html('');
					$input.val('');
				});

			}
	
			var $input = $('<input>',{
				class: 'signature',
				type: 'hidden',
			}).appendTo(this)
			.on('change', function(){
				$drawpad.html('');
				var data = JSON.parse(this.value);
				data.forEach(function(item){
					var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
					for (const [key, value] of Object.entries(item)) {
						path.setAttribute(key, value);
					}
					$drawpad.append(path);
				});
				console.log(data);
			});


		});

	}

})(jQuery);