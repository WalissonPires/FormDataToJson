# SerializeFormDataToJson

### How it works:
```javascript
  $('#formPerson').submit(function(){

			var formDataJson = $(this).serializeJson();  //plugin function

			//send ajax request

			return false;
		});
```

### Dependencies

- jQuery >= 1.2
*Note: You can use it without jQuery, just use the global **parseForm ToJson** function. However, you will have more work.*

### Functions
```javascript
/***
* JQuery function that captures form data and convert to json object
*/
 $("#myForm").serializeJson()
```

```javascript
/***
* Global function that accepts form data as parameter and converts them to json object
* @param formArray - [{ name: string, value: string }]
*/
 window.parseFormToJson(formArray)
```