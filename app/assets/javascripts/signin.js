(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/ja_JP/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

let $section = $('.section')
    $section1 = $('#section1'),
    $section2 = $('#section2'),
    $section3 = $('#section3'),
    $fbName = $('.fb-name'),
    $fbEmail = $('.fb-email'),
    $ppName = $('.pp-name'),
    $ppEmail = $('.pp-email'),
    $reqFbId = $('input[name=fbId]'),
    $reqFbName = $('input[name=fbName]'),
    $reqFbEmail = $('input[name=fbEmail]'),
    $reqPpPayerId = $('input[name=ppPayerId]'),
    $reqPpOrderId = $('input[name=ppOrderId]'),
    $reqPpName = $('input[name=ppName]'),
    $reqPpEmail = $('input[name=ppEmail]')

function statusChangeCallback(response) {
  console.log(response)
  if (response.status === 'connected') {
    fetchMe()
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  })
}

function logout() {
  FB.logout(function (response) {
    location.reload()
  })
}

window.fbAsyncInit = function () {
  FB.init({
    appId: FB_APP_ID,
    cookie: true,
    xfbml: true,
    version: 'v5.0'
  })

  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  })
}

function fetchMe() {
  FB.api('/me?fields=id,email,name', function (res) {
    console.log(res)
    $reqFbId.val(res.id)
    $reqFbName.val(res.name)
    $reqFbEmail.val(res.email)
    $fbName.text(res.name)
    $fbEmail.text(res.email)
    goToSection2()
  },{scope:'public_profile,email'})
}

paypal.Buttons({
  createSubscription: function (data, actions) {
    console.log(data)
    return actions.subscription.create({
      'plan_id': PP_PLAN_ID
    })
  },
  onApprove: function (data, actions) {
    console.log(data)
    return actions.order.capture().then(function (details) {
      console.log(details)
      const payer = details.payer
      $reqPpOrderId.val(details.id)
      $reqPpPayerId.val(payer.payer_id)
      $reqPpName.val(payer.name.surname + ' ' + payer.name.given_name)
      $reqPpEmail.val(payer.email_address)
      $ppName.text(payer.name.surname + ' ' + payer.name.given_name)
      $ppEmail.text(payer.email_address)
      // ここでメール送信及、DBへのInsertを行う
      // Call your server to save the transaction
      // return fetch('/paypal-transaction-complete', {
      //   method: 'post',
      //   headers: {
      //     'content-type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     orderID: data.orderID
      //   })
      // });
      goToSection3()
    })
  }
}).render('#paypal-button-container')

setTimeout(() => {
  $section1.fadeIn()
}, 1000)

const goToSection2 = () => {
  $section.hide()
  $section2.fadeIn()
}

const goToSection3 = () => {
  $section.hide()
  $section3.fadeIn()
}