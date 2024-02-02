        /*********************************************************/
        /*               Callbacks for the greeter               */
        /*********************************************************/

        /**
         * show_prompt callback.
         */
        window.show_prompt = function(text, type) {
                // type is either "text" or "password"
                let prompt = document.getElementById("prompt"),
                        entry = document.getElementById("entry");

                entry.placeholder = text.charAt(0).toUpperCase() + text.slice(1, -1);

                // clear entry
                entry.value = "";
                entry.type = type == 0 ? "text" : "password";
        };

        /**
         * show_message callback.
         */
        window.show_message = function(text, type) {
                if (0 === text.length) {
                        return;
                }
                let messages = document.getElementById('messages');
                messages.style.visibility = "visible";
                // type is either "info" or "error"
                if (type == 'error') {
                        text = `<p style="color:red;">${text}</p>`;
                }
                messages.innerHTML = `${messages.innerHTML}${text}`;
        };

        /**
         * authentication_complete callback.
         */
        window.authentication_complete = function() {
                if (window.lightdm.is_authenticated) {
                        // Start default session
                        // let body = document.getElementById('body');
                        let session = window.lightdm.default_session
                        document.documentElement.addEventListener('transitionend', () => {window.lightdm.start_session(session)});
                        document.documentElement.className = 'session_starting';
                } else {
                        show_message("Authentication Failed", "error");
                        setTimeout(start_authentication, 2000);
                }
        };

        /**
         * autologin_timer_expired callback.
         */
        function autologin_timer_expired(username) {
                /* Stub.  Does nothing. */
        }

        /*******************************************************************/
        /*                Functions local to this theme                    */
        /*******************************************************************/

        /**
         * clear_messages
         */
        function clear_messages() {
                let messages = document.getElementById("messages");
                messages.innerHTML = "";
                messages.style.visibility = "hidden";
        }

        /**
         * Kickoff the authentication process
         */
/*      window.start_authentication = function() {
                clear_messages();
                // start without providing "user" to make the greeter prompt for "user"
                window.lightdm.authenticate(null);
 };     */
        window.start_authentication = function() {
         clear_messages();
         // start without providing "user" to make the greeter prompt for "user"
         window.lightdm.authenticate();

         setTimeout(function(){
                 window.lightdm.respond("");
         }, 1000);
    };


        /**
         * handle the input from the entry field.
         */
        window.handle_input = function() {
                let entry = document.getElementById("entry");
                window.lightdm.respond(entry.value);
        };

        window.addEventListener("GreeterReady", () => {
                window.lightdm.show_message.connect(show_message)
                window.lightdm.show_prompt.connect(show_prompt)
                window.lightdm.authentication_complete.connect(authentication_complete)
                window.lightdm.autologin_timer_expired.connect(autologin_timer_expired)

                start_authentication()
        });


// Nouvelles lignes
    function arreter() {
        lightdm.shutdown();
    }

    function redemarrer() {
        lightdm.restart();
    }

    function updateTime() {
        var timeSpan = document.querySelector('.time');
        var currentTime = new Date();
        timeSpan.textContent = ' ' + currentTime.toLocaleTimeString();
    }
    setInterval(updateTime, 1000);

    function mettreEnVeille() {
        lightdm.suspend();
    }

    function actualiserPage() {
        location.reload();
    }

   var tempsRestant = 600; // 600 secondes = 10 minutes

    function afficherCompteur() {
        var minutes = Math.floor(tempsRestant / 60);
        var secondes = tempsRestant % 60;
        document.getElementById('compteur').textContent = ' ' + minutes + ' min ' + secondes + ' sec';
    }

    // Actualise la page toutes les secondes
    var intervalID = setInterval(function () {
        tempsRestant--;
        afficherCompteur();

        if (tempsRestant <= 0) {
            clearInterval(intervalID); // Arrête le compteur lorsque le temps >
            actualiserPage(); // Actualise la page une fois le compteur terminé
        }
    }, 1000);


    document.getElementById('login').addEventListener('click', function() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:9898/unix-login', true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            console.log('La requête a été effectuée avec succès.');
            console.log(xhr.responseText);
          } else {
            console.error('La requête a échoué avec le statut : ' + xhr.status);
          }
        }
      };
      xhr.send();
      window.location.href = '/usr/share/web-greeter/themes/qrauthent/index2.html';
    });

setInterval(function() {
        var myImageElement = document.getElementById('qrcode');
        myImageElement.src = '/usr/share/web-greeter/themes/qrauthent/qrcode.png?rand=' + Math.random();
}, 100);
