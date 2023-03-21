// 회원 목록 조회 API를 요청해주세요.
const getUser = async () => {
  // 받은 데이터로 createUserDiv함수를 이용해
  // 목록 화면을 완성해주세요.
  await axios.get('http://localhost:3000/users').then((res)=>{
    res.data.forEach(element => {
      createUserDiv(element)
    });
  })
  createUserDiv()
}

const createUserDiv = (data) => {
  const userTableItem = document.createElement('div')
  userTableItem.className = 'User_Table_Item'

  // user
  const nameItem = document.createElement('div')
  nameItem.className = 'Item_Info'
  nameItem.textContent = data?.name || '최원재'

  const emailItem = document.createElement('div')
  emailItem.className = 'Item_Info'
  emailItem.textContent = data?.email || 'cwj980119@gmail.com'

  const personalItem = document.createElement('div')
  personalItem.className = 'Item_Info'
  personalItem.textContent = data?.personal || '980119-1******'

  const phoneItem = document.createElement('div')
  phoneItem.className = 'Item_Info'
  phoneItem.textContent = data?.phone || '010-1234-5678'

  const preferItem = document.createElement('div')
  preferItem.className = 'Item_Info'
  preferItem.textContent = data?.prefer || 'https://naver.com'

  // og
  const userTableSubItem = document.createElement('div')
  userTableSubItem.className = 'User_Table_Item'

  const ogImgItem = document.createElement('img')
  ogImgItem.className = 'Og_Img_Info'
  ogImgItem.src =
    data?.og?.image || 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png'

  const ogTitleItem = document.createElement('div')
  ogTitleItem.className = 'Og_Item_Title'
  ogTitleItem.textContent = data?.og?.title || '네이버'

  const ogDescItem = document.createElement('div')
  ogDescItem.className = 'Og_Item_Info'
  ogDescItem.textContent =
    data?.og?.description ||
    '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요'

  // 합체
  const menuBack = document.querySelector('#User_Data_Wrapper')
  menuBack.appendChild(userTableItem)
  menuBack.appendChild(userTableSubItem)
  userTableItem.appendChild(nameItem)
  userTableItem.appendChild(emailItem)
  userTableItem.appendChild(personalItem)
  userTableItem.appendChild(phoneItem)
  userTableItem.appendChild(preferItem)
  userTableSubItem.appendChild(ogImgItem)
  userTableSubItem.appendChild(ogTitleItem)
  userTableSubItem.appendChild(ogDescItem)
}
