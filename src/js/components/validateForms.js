(function () {
  // Forms
  let $forms = [id("contact-form")];

  let formValidator = function (params) {
    let $form = params.form,
      $formBtn = params.formBtn,
      $uploadFilesBlock = params.uploadFilesBlock,
      errorsClass = "invalid",
      errorsTag = "p",
      // $filesInput = params.filesInput,
      // Rules from jquery.validate
      rules = {
        name: {
          required: true,
        },
        // tel: {
        //   required: true,
        //   pattern: /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,
        //   // or: 'email'
        // },
        email: {
          required: true,
          pattern:
            /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
          // or: 'tel'
        },
        msg: {
          required: true,
          pattern: /[^\<\>\[\]%\&'`]+$/,
        },
        policy: {
          required: true,
        },
      },
      messages = {
        // tel: {
        //   // required: 'Введите ваш телефон или E-mail',
        //   required: "Введите ваш телефон",
        //   pattern: "Укажите верный телефон",
        // },
        name: {
          required: "Enter your name",
        },
        email: {
          // required: 'Введите ваш E-mail или телефон',
          required: "Enter your e-mail",
          pattern: "Enter valid e-mail",
        },
        msg: {
          required: "Type a message",
          pattern: "Invalid message",
        },
        policy: {
          required: "Confirm the privacy policy",
        },
      },
      /**
       * Function searches only for the elements that are specified in the rules.
       * @param {HTMLFormElement} $form
       * @returns {object} {fieldName: fieldValue}
       */
      getFormData = function ($form) {
        let formElements = $form.elements,
          values = {};

        for (let rule in rules) {
          let formElement = formElements[rule];

          if (formElement) {
            values[rule] = formElement.value;
          }
        }

        return values;
      },
      /**
       * Function of validating form.
       * @description Show or hide errors, set form.validate to true or false
       */
      validationForm = function () {
        let errors = {},
          thisForm = $form,
          values = getFormData(thisForm);

        for (let elementName in values) {
          let rule = rules[elementName],
            $formElement = thisForm[elementName],
            elementValue = values[elementName],
            or = rule.or,
            $orFormElement = thisForm[or];

          if (rule) {
            console.log($formElement);
            if (
              $formElement.hasAttribute("required") ||
              rule.required === true
            ) {
              let elementType = $formElement.type,
                pattern = rule.pattern;

              // Если элемент не чекнут или пустой
              if (
                ((elementType === "checkbox" || elementType === "radio") &&
                  !$formElement.checked) ||
                elementValue === ""
              ) {
                if (or && $orFormElement) {
                  if ($orFormElement.value === "") {
                    errors[elementName] = messages[elementName].required;
                    continue;
                  }
                } else {
                  errors[elementName] = messages[elementName].required;
                  continue;
                }
              }

              // Если текстовый элемент, у которого есть щаблон для заполнения
              if (
                elementType !== "cehckbox" &&
                elementType !== "radio" &&
                pattern
              ) {
                if (
                  elementValue !== "" &&
                  pattern.test(elementValue) === false
                ) {
                  errors[elementName] = messages[elementName].pattern;
                  continue;
                }
              }

              hideError($formElement);
            }
          }
        }

        if (Object.keys(errors).length == 0) {
          thisForm.removeEventListener("change", validationForm);
          thisForm.removeEventListener("input", validationForm);
          $form.validatie = true;
        } else {
          thisForm.addEventListener("change", validationForm);
          thisForm.addEventListener("input", validationForm);
          showErrors(thisForm, errors);
          $form.validatie = false;
        }
      },
      showErrors = function ($form, errors) {
        let $formElements = $form.elements;

        for (let elementName in errors) {
          let errorText = errors[elementName],
            $errorElement = `<${errorsTag} class="${errorsClass}">${errorText}</${errorsTag}>`,
            $formElement = $formElements[elementName],
            $nextElement = $formElement.nextElementSibling;

          if ($nextElement && $nextElement.classList.contains(errorsClass)) {
            if ($nextElement.textContent !== errorText) {
              $nextElement.textContent = errorText;
            }
            continue;
          } else {
            $formElement.insertAdjacentHTML("afterend", $errorElement);
          }

          $formElement.classList.add(errorsClass);
        }
      },
      hideError = function ($formElement) {
        let $nextElement = $formElement.nextElementSibling;
        $formElement.classList.remove(errorsClass);
        if ($nextElement && $nextElement.classList.contains(errorsClass)) {
          $nextElement.parentElement.removeChild($nextElement);
        }
      },
      submitHandler = function (event) {
        let $form = q("#" + event.detail.id + ">form"),
          eventType = event.type;

        if (eventType === "wpcf7mailsent") {
          $form.reset();

          let $formElements = $form.elements;

          for (let i = 0; i < $formElements.length; i++) {
            hideError($formElements[i]);
            $formElements[i].classList.remove("filled");
          }

          if ($uploadFilesBlock) {
            $uploadFilesBlock.innerHTML = "";
          }
          // if ($form === $quizForm) {
          //   id('quiz').resetQuiz();
          // }

          setTimeout(function () {
            $form.classList.remove("sent");
          }, 3000);
  
          // thanksPopup.openPopup();
          // thanksPopupTimer = setTimeout(function() {
          //   thanksPopup.closePopup();
          // }, 3000);

          console.log("sended");
        } else if (eventType === "wpcf7mailfailed") {
          errorPopup && errorPopup.openPopup();
          console.log("failed");
        }

        $form.classList.remove("loading");

      },
      toggleInputsClass = function () {
        let $input = event.target,
          type = $input.type,
          files = $input.files,
          classList = $input.classList,
          value = $input.value;

        if (
          type === "text" ||
          type === "email" ||
          type === "tel" ||
          type === "number" ||
          $input.tagName === "TEXTAREA"
        ) {
          if (value === "") {
            classList.remove("filled");
          } else {
            classList.add("filled");
          }
        } else if (type === "file") {
          // $input.filesArray = [];

          let uploadedFiles = "";
          for (let i = 0, len = files.length; i < len; i++) {
            // $input.filesArray[i] = files[i];
            uploadedFiles +=
              '<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">' +
              files[i].name +
              "</span></span>";
          }
          $uploadFilesBlock.innerHTML = uploadedFiles;
        }
      };

    $form.setAttribute("novalidate", "");
    $form.validatie = false;
    
    $formBtn.addEventListener("click", function (e) {
      validationForm();

      if ($form.validatie === false) {
        e.preventDefault();
      } else {
        $form.classList.add("loading");
        $formBtn.blur();
      }
    });
    if (!document.wpcf7mailsent) {
      document.addEventListener("wpcf7mailsent", submitHandler);
      document.wpcf7mailsent = true;
    }
    $form.addEventListener("input", toggleInputsClass);
  };

  for (var i = $forms.length - 1; i >= 0; i--) {
    if ($forms[i]) {
      formValidator({
        form: $forms[i],
        formBtn: q(".btn", $forms[i]) || q('.btn[form="' + $forms[i].id + '"]'),
        uploadFilesBlock: q(".uploadedfiles", $forms[i]),
        filesInput: q('input[type="file"]', $forms[i]),
      });
    }
  }
})();
