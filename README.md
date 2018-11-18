# Thesaurus Input

[![Build Status](https://travis-ci.org/nickakey/ThesaurusInput.svg?branch=master)](https://travis-ci.org/nickakey/ThesaurusInput)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)

A open source React input component, where synonyms are automatically generated for typed words. 

![Demo Gif](https://i.imgur.com/FGWCGo5.gif)

## USAGE

This module is distributed via **npm**

`npm install thesaurus-input`

Use it like you would any react input component

```javascript
import ThesaurusInput from "thesaurus-input";

const Container = () => (
  <div className="App">
    <ThesaurusInput apikey="YOURAPIKEY" onChange={handleChangeFunction}/>
  </div>
)
```


## PROPS

### apikey
**string** _(required)_:  
Your API key from [thesaurus.altervista](http://thesaurus.altervista.org)

### onChange
**function** _(required)_:  
Callback invoked when the value is changed.
Invoked with a a string representing the state of the input field

### thesaurus
**boolean**  
Set to false if you don't want thesaurus functionality
(true by default)

### placeholder
**string**   
The short hint displayed in the input before the user enters a value.
By default "Start typing"

### id
**string**  
The id of the input element.

### className
**string**  
The CSS class name of the wrapper element.

### autofocus
_boolean_
If true, the input will be focused during the first mount.
