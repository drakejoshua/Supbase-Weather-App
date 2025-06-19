/**
 * Custom hook to manage stateful value synchronized with localStorage.
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {*} initialValue - The initial value to use if no value is found in localStorage.
 * @returns {[*, function]} - Returns an array with the current stateful value and a function to update it.
 *
 * @example
 * const [value, setValue] = useLocalStorage('myKey', 'defaultValue');
 *
 * @function useLocalStorage
 * @param {string} key - The key to store the value under in localStorage.
 * @param {*} initialValue - The initial value to use if no value is found in localStorage.
 * @returns {[*, function]} - An array containing the current value and a function to update it.
 */


// import react hooks
import { useState } from 'react';


function useLocalStorage( key, initialValue ) {

  // create stateful value from localStorage
  const [ item, setItem ] = useState( function() {

    // retrieve data from localStorage
    var localData = localStorage.getItem( key );
    var validData;

    // check if retrieved data is valid
    if ( localData == null ) {
        validData = initialValue; 
    } else {
        validData = JSON.parse(localData)
    }

    return validData
  });


  // updateItem()
  // used to update hook's state and localStorage with a new value
  function updateItem( newData ) {
  
    // check if newValue is a callback
    // reason for this check is to know whether
    // to run the callback first before updating state and localStorage
    if ( typeof newData == "function" ) {
       
      // execute callback and get it's returnValue
      var returnValue = newData( item );

      // update state and localStorage using returnValue
      setItem( returnValue );
      localStorage.setItem( key, JSON.stringify( returnValue ) )

    } else { 

      // update state and localStorage directly using newData
      setItem( newData );
      localStorage.setItem( key, JSON.stringify( newData ) )
    }
  }

  // export hook's interface
  return [ item, updateItem ]
}

export default useLocalStorage
