// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  const phone = document.querySelector('#PhoneNumber01').value + document.querySelector('#PhoneNumber02').value + document.querySelector('#PhoneNumber03').value
  console.log(phone)
  await axios.post('http://localhost:3000/tokens/phone',{phone: phone})
  console.log('인증 번호 전송')
}

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const token = document.querySelector('#TokenInput').value
  const phone = document.querySelector('#PhoneNumber01').value + document.querySelector('#PhoneNumber02').value + document.querySelector('#PhoneNumber03').value
  const result = await axios.patch('http://localhost:3000/tokens/phone',{token: token, phone: phone})
  if(result.data) console.log('핸드폰 인증 완료')
  else console.log('핸드폰 인증 실패')
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.querySelector('#SignupName').value
  const email = document.querySelector('#SignupEmail').value
  const personal = document.querySelector('#SignupPersonal1').value + '-' + document.querySelector('#SignupPersonal2').value
  const prefer = document.querySelector('#SignupPrefer').value
  const pwd = document.querySelector('#SignupPwd').value
  const phone = document.querySelector('#PhoneNumber01').value + document.querySelector('#PhoneNumber02').value + document.querySelector('#PhoneNumber03').value

  console.log(name, email, personal, prefer, pwd, phone)

  const result = await axios.post('http://localhost:3000/user',{
    name: name,
    email: email,
    personal: personal,
    prefer: prefer,
    pwd: pwd,
    phone: phone
  })
  console.log(result)
  console.log('회원 가입 완료')
}
