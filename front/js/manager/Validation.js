
export default class Validation {

    /**
     * valide le prenom
     * @param {string} input 
     * @returns 
     */
    static firstName (input) {
        let testName = /^[a-zA-Z ,.'-]+$/.test(input);
    
        if (testName) {
          firstNameErrorMsg.innerText = "";
          return true;
        } else {
          firstNameErrorMsg.innerText = "Prénom incorect";
          return false;
        }

      };
    /**
     * valide le nom
     * @param {string} input 
     * @returns 
     */
    static lastName (input) {
        let testName = /^[a-zA-Z ,.'-]+$/.test(input);
    
        if (testName) {
          lastNameErrorMsg.innerText = "";
          return true;
        } else {
          lastNameErrorMsg.innerText = "Nom incorect";
          return false;
        }

      };

      /**
       * valide l'adresse
       * @param {string} input 
       * @returns 
       */
      static adresse (input) {
        let testAdresse =
          /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(input);
    
        if (testAdresse) {
          addressErrorMsg.innerText = "";
          return true;
        } else {
          addressErrorMsg.innerText = "Adresse incorect";
          return false;
        }
      };

      /**
       * valide la ville
       * @param {sting} input 
       * @returns 
       */
      static city (input) {
        let testCity = /^[a-zA-Z ,.'-]+$/.test(input);
    
        if (testCity) {
          cityErrorMsg.innerText = "";
          return true;
        } else {
          cityErrorMsg.innerText = "Ville incorect";
          return false;
        }
      };

      /**
       * valide l'email
       * @param {string} input 
       * @returns 
       */
      static email (input) {
        let testEmail =
          /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(input);
    
        if (testEmail) {
          emailErrorMsg.innerText = "";
          return true;
        } else {
          emailErrorMsg.innerText = "Email incorect";
          return false;
        }
      };


}