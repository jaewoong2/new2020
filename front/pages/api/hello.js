import React from 'react';
import { useEffect } from 'react';

const DuckGyuoo = () => {


  //https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Fetch%EC%9D%98_%EC%82%AC%EC%9A%A9%EB%B2%95
  // fetch() 함수 사용 법  (api 받기)
  //++ fetch 말고 axios 라이브러리 사용해도 ㄱㅊ함 이게 더 편함
  // 1. fetch 함수는 비동기로서 처리해줘야한다. api 받을 때 비동기 적으로 받아야해서.
  // fetch('Url', {
    // 여기에서는 method 나 
    // body, headers, credentials, 등 을 설정 할 수 있다.
    // method : 'POST' 
  // })
  // .then(res => res.json())  // fetch 함수를 통해 받은 값을 res로 정하고 그후 res.json() 을 return 해준다.
   // .catch(err => console.error(err)) 

//  2. await async 방법 
// function  async asd(params) {
  // const result = await fetch('url'); 
  // result.json() 이런 식으로 위에 .then() 방법 과 같은 값을 얻을 수 있다.
// }

  // 보통 try- catch랑 같이 사용함
  // const catchPromise = async () =>{  
  //   try {
  //     const result = await fetch('url');
  //     const resultJson = result.json()
  //   } catch(error) {
  //     console.error(error)
  //   }
  // }
//


useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.json())
    .then(json => console.log(json))
},[])

// {
  // "userId": 1,
  // "id": 1,
  // "title": "delectus aut autem",
  // "completed": false
// }

// 이런식으로 결과 값이 출력됨.

// https://jsonplaceholder.typicode.com/todos/(숫자)
// 이러면 각각 다른 값들을 return함.
// 반복문을 사용, 새로운 컴포넌트 1개를 이용하고,
// 각각 값들을 화면에 보여주도록 합시다
// 예) 화면 에서 제목 - delectus aut autem" 
// 내 아이디 - 1
// 이런식으로 보여줄 수 있도록 하면 되겠습니다.
// 20개 정도를 화면에 보여주면 될 것 같습니다.

  return (
    <div>
    </div>
  );
};

export default DuckGyuoo;