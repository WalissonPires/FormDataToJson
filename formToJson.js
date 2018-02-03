(function(){

	function parseName(name) {

		var parts = [];
		var i = 0;	
		var c = null;
		var temp = '';

		while (i < name.length) {

			c = name[i];

			if (c === '.') {
				
				if (temp.length > 0) {
					parts.push(temp);
					temp = '';
	            }
				
	        } else if (c === '[') {

				if (temp.length > 0)
					parts.push(temp);
				temp = '';
				
				while((c = name[i]) !== ']' && i < name.length) {
					temp += c; 
					i++;
	            }

				if (c !== ']')
					throw 'Fim inesperado';
				else {
					temp += c;
					parts.push(temp);
					temp = '';
	            }	

	        } else {
				temp += c;
	        }

			i++;
	    }

		if (temp.length > 0)
			parts.push(temp);

		return parts;
	}

	function parseFormToJson(formArray) {

	    var result = {};
		var rootArrayMap = {};

	    for (var i = 0; i < formArray.length; i++) {

	        var root = result;
	        
			var dataIndex = null;
	        var data = formArray[i];
	        var dataNames = parseName(data.name);
	        var subName = '';

	        for (var j = 0; j < dataNames.length; j++) {

	            var prop = dataNames[j];
	            var lastSubname = subName;
	            subName += prop;

	            if (prop.indexOf('[') === -1) { //is object prop

	                if (j+1 >= dataNames.length) { //is last prop

	                	if (dataIndex === null) { //is primitive value
					   
					   		root[prop] = data.value;

						} else {
				
							if (root[dataIndex] === undefined) 
								root[dataIndex] = {};

							root[dataIndex][prop] = data.value;
							dataIndex = null;
	                    }
						
	                } else {

	                    if (root[prop] === undefined) {

	                        var nextDataName = dataNames[j+1];
	                        if (nextDataName.indexOf('[') === 0) //is array
	                            root[prop] = [];
	                        else
	                            root[prop] = {}; //is complex object
	                    }

	                    root = root[prop];
	                }	

	            } else { //is index array

	                if (j+1 >= dataNames.length) 
	                    root.push(data.value);
	                else {


	                    if (rootArrayMap[subName] === undefined) {

							dataIndex = getArrayIndex(rootArrayMap, lastSubname);
	                        rootArrayMap[subName] = { idx: dataIndex, group: lastSubname }; // map index

							var nextDataName = dataNames[j+1];
							if (nextDataName.indexOf('[') === 0)
								root.push([]);
							else
								root.push({});

	                    } else {
	                    	
							dataIndex = rootArrayMap[subName].idx;
	                    }
						
						root = root[dataIndex];
						dataIndex = null;
	                }
	            }
	        }
	    }

	    return result;
	}

	function getArrayIndex(indexMap, group) {

		var props = Object.keys(indexMap);
		var indexCount = 0;
		for (var i = 0; i < props.length; i++) {

			if (indexMap[props[i]].group === group)
				indexCount++;
		}

		return indexCount;
	}

	//jQuery extension
	if (window.jQuery !== undefined && jQuery.fn !== undefined) {
		
		jQuery.fn.serializeJson = function() {

			if (!this.is('form'))
				throw 'A form element was expected';

			return parseFormToJson(this.serializeArray());
		};
	}

	//js global acess
	window.parseFormToJson = parseFormToJson;
})();