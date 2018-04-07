# SerializeFormDataToJson

### How it works:
```javascript
  $('#formPerson').submit(function(){

        var options = {
            formatterValue: function(value) {
              return value.toUpperCase();
            }
        };

        var formDataJson = $(this).serializeJson(options);  //plugin function

        //send ajax request

        return false;
  });
```
 [View Sample!](https://walissonpires.github.io/FormDataToJson/)
 
 
### Dependencies

- jQuery >= 1.2
*Note: You can use it without jQuery, just use the global **parseForm ToJson** function. However, you will have more work.*

### Functions
```javascript
/***
* JQuery function that captures form data and convert to json object
* @param {SerializeOptions} options 
*/
 $("#myForm").serializeJson(options)
```

```javascript
/***
* Global function that accepts form data as parameter and converts them to json object
* @param {object} formArray 
* @param {string} formArray[].name
* @param {string} formArray[].value
* @param {SerializeOptions} options 
*/
 window.parseFormToJson(formArray, options)
```

```javascript
/***
* Type Definitions
* 
* @typedef SerializeOptions
* @property {formatterValueCallback} formatterValue
*
* @callback formatterValueCallback
* @param {string} value
* @param {string} field
* @return {string}
*/


```
