
      // Form elements
      const loginForm = document.querySelector(".login-form"); // Signup form
      const registerForm = document.querySelector(".register-form"); // Login form
      const formbox = document.querySelector(".form-box"); // Added missing formbox
      const signupPage = document.querySelector(".signupPage");
    
      // Initialize - Show SIGNUP form first
      loginForm.style.left = "50%";
      loginForm.style.opacity = 1;
      registerForm.style.left = "150%";
      registerForm.style.opacity = 0;
      formbox.style.height = "450px"; // Fixed height for both forms
    
      // Form switching functions - SAME HEIGHT
      function loginFunction() {
        loginForm.style.left = "50%";
        loginForm.style.opacity = 1;
        registerForm.style.left = "150%";
        registerForm.style.opacity = 0;
        formbox.style.height = "450px";
      }
    
      function registerFunction() {
        loginForm.style.left = "-50%";
        loginForm.style.opacity = 0;
        registerForm.style.left = "50%";
        registerForm.style.opacity = 1;
        formbox.style.height = "450px"; // Same height as signup
      }
    
      // ===== SIGNUP FORM ===== (your existing code)
      const signupInputs = {
        name: loginForm.querySelector('input[type="text"]'),
        email: loginForm.querySelector('input[type="email"]'),
        password: loginForm.querySelector('input[type="password"]'),
        phone: loginForm.querySelector('input[type="tel"]')
      };
    
      // Clear validation when typing
      Object.values(signupInputs).forEach(input => {
        input.addEventListener('input', function() {
          this.setCustomValidity("");
        });
      });
    
      // Field validation functions
      const validators = {
        name: value => {
          if (!value.trim()) return "Please enter a Name!";
          if (value.trim().length < 2) return "Name must be at least 2 characters!";
          return "";
        },
        email: value => {
          if (!value.trim()) return "Please enter an Email!";
          if (!/^\S+@\S+\.\S+$/.test(value)) return "Please enter a valid Email!";
          return "";
        },
        password: value => {
          if (!value.trim()) return "Please enter a Password!";
          if (value.length < 8) return "Password must be at least 8 characters!";
          return "";
        },
        phone: value => {
          if (!value.trim()) return "Please enter a Phone Number!";
          if (value.replace(/\D/g, '').length < 8) return "Please enter a valid Phone Number!";
          return "";
        }
      };
    
      // Handle Enter key navigation for signup
      Object.entries(signupInputs).forEach(([fieldName, input], index) => {
        input.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
            event.preventDefault();
            
            const error = validators[fieldName](this.value);
            if (error) {
              this.setCustomValidity(error);
              this.reportValidity();
              return;
            }
            
            this.setCustomValidity("");
            
            // Move to next field or submit
            const nextField = Object.values(signupInputs)[index + 1];
            if (nextField) {
              nextField.focus();
            } else {
              loginForm.dispatchEvent(new Event('submit'));
            }
          }
        });
      });
    
      // Signup form submission
      loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let firstInvalidField = null;
    
        const validationOrder = ['name', 'email', 'password', 'phone'];
        for (const fieldName of validationOrder) {
          const input = signupInputs[fieldName];
          const error = validators[fieldName](input.value);
          
          if (error && !firstInvalidField) {
            input.setCustomValidity(error);
            input.reportValidity();
            firstInvalidField = input;
          } else {
            input.setCustomValidity("");
          }
        }
    
        if (!firstInvalidField) {
          console.log("Signup form valid!");
          // loginForm.submit(); // Uncomment for real submission
        } else {
          firstInvalidField.focus();
        }
      });
    
      // ===== LOGIN FORM ===== (identical behavior for email/password)
      const loginInputs = {
        email: registerForm.querySelector('input[type="email"]'),
        password: registerForm.querySelector('input[type="password"]')
      };
    
      // Clear validation when typing
      Object.values(loginInputs).forEach(input => {
        input.addEventListener('input', function() {
          this.setCustomValidity("");
        });
      });
    
      // Handle Enter key navigation for login
      Object.entries(loginInputs).forEach(([fieldName, input], index) => {
        input.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
            event.preventDefault();
            
            const error = validators[fieldName](this.value);
            if (error) {
              this.setCustomValidity(error);
              this.reportValidity();
              return;
            }
            
            this.setCustomValidity("");
            
            // Move to next field or submit
            const nextField = Object.values(loginInputs)[index + 1];
            if (nextField) {
              nextField.focus();
            } else {
              registerForm.dispatchEvent(new Event('submit'));
            }
          }
        });
      });
    
      // Login form submission
      registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let firstInvalidField = null;
    
        const validationOrder = ['email', 'password'];
        for (const fieldName of validationOrder) {
          const input = loginInputs[fieldName];
          const error = validators[fieldName](input.value);
          
          if (error && !firstInvalidField) {
            input.setCustomValidity(error);
            input.reportValidity();
            firstInvalidField = input;
          } else {
            input.setCustomValidity("");
          }
        }
    
        if (!firstInvalidField) {
          console.log("Login form valid!");
          // registerForm.submit(); // Uncomment for real submission
        } else {
          firstInvalidField.focus();
        }
      });
    
      // Connect switch buttons
      document.querySelectorAll('.switch-to-login').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          registerFunction();
        });
      });
    
      document.querySelectorAll('.switch-to-signup').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          loginFunction();
        });
      });