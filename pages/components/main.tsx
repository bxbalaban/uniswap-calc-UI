import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
// import "./styles.css"

const style = {
  wrapper: `h-fit object-scale-down  m-auto max-w-screen-md flex align-middle flex items-center justify-center mt-20 vertical-align: baseline`,
  wrapperForColumns: `grid gap-4 grid-cols-3 place-items-center auto-cols-max `,
  content: `bg-[#181B1F] w-[100rem] rounded-2xl p-5 `,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-2 rounded-2xl p-4 text-xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-xl`,
  currencySelector: `flex`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `w-44 justify-center bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
}


const customStyles = {
  content: {
    top: '80%',
    left: '80%',
    right: '%80',
    bottom: '%80',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#0a0b0d',
    padding: 10,
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
}


let uri = "http://127.0.0.1:5000/calculate"

function updateQueryStringParameter(params: Map<string, number>) {

  // value: number, key: string
  var myMap = Object.values(params).map((a) => {
    let key = a.name
    let value = a.val
    if(value!==value){}
    else{
      var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
      var separator = uri.indexOf('?') !== -1 ? "&" : "?";
      if (uri.match(re)) {
        return uri = uri.replace(re, '$1' + key + "=" + value + '$2');
      }
      else {
        return uri = uri + separator + key + "=" + value;
      }
    }
  });

}


const main = () => {
  const [depositUsdc, setdepositUsdc] = useState('')
  const [depositEth, setDepositEth] = useState('')
  const [tradeprice, setTradeprice] = useState('')
  const [data, setData] = useState([{}])

  const params = [
    { name: "usdc", val: parseInt(depositUsdc) },
    { name: "eth", val: parseInt(depositEth) },
    { name: "tradeprice", val: parseInt(tradeprice) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault()
    updateQueryStringParameter(params)
    console.log(uri)
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
    });
    const result = await response.json();

    setData(result)
    console.log(data)
    
  }

  useEffect(() => {

    console.log("inside home")
    fetch(uri).then(
      response => response.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }

    ).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    })
  }, [])

  return (

    <div className={style.wrapper}>

      <div className={style.content}>
        <div className={style.wrapperForColumns}>
          <div className={style.formHeader}>
            <div className={style.transferPropContainer}>
              <h2>Deposit</h2>
            </div>
          </div>
          <div></div>
          <div className={style.formHeader}>
            <div className={style.transferPropContainer}>
              <h2>ETH Current Price</h2>
            </div>
          </div>
          <div className={style.transferPropContainer}>
            {/* deposit 1 input */}
            <input
              type="text"
              id="deposit-1"
              name="deposit-1"
              className={style.transferPropInput}
              placeholder="0.0"
              // value={1}
              pattern="^[0-9]*[.,]?[0-9]*$"
              onChange={(e) => setdepositUsdc(e.target.value)}
            />
            <div className={style.currencySelector}>
              <div className={style.currencySelectorContent}>
                <h2>USD</h2>
              </div>
            </div>
          </div>
          <div></div>
          <div className={style.transferPropContainer}>
            {/* ETH 1 input */}
            <input
              type="text"
              className={style.transferPropInput}
              placeholder="0.0"
              pattern="^[0-9]*[.,]?[0-9]*$"
              onChange={(e) => setTradeprice(e.target.value)}
            />
            <div className={style.currencySelector}>
              <div className={style.currencySelectorContent}>
                <h2>USD</h2>
              </div>
            </div>
          </div>
          <div className={style.transferPropContainer}>
            {/* deposit 2 input */}
            <input
              type="text"
              className={style.transferPropInput}
              placeholder="0.0"
              pattern="^[0-9]*[.,]?[0-9]*$"
              onChange={(e) => setDepositEth(e.target.value)}
            />
            <div className={style.currencySelector}>
              <div className={style.currencySelectorContent}>
                <h2>ETH</h2>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div className={style.formHeader}>
            <div className={style.transferPropContainer}>
              <h2>ETH Price Range</h2>
            </div>
          </div>
        </div>
        <div className="relative pt-1 w-full md:w-1/5.">

          <div className={style.transferPropContainer}>
            <div className={style.currencySelector}>
              <div className={style.currencySelectorContent}>
                <h2>MIN</h2>
              </div>
            </div>
            <input
              type="range"
              className="
                form-range
                w-full
                h-8
                p-2
                bg-white
                focus:ring-0
              "
              min="0"
              max="100"
              id="customRange2"
            />
            <div className={style.currencySelector}>
              <div className={style.currencySelectorContent}>
                <h2>VAL</h2>
              </div>
            </div>
          </div>
          <div className={style.transferPropContainer}>
            <div className={style.currencySelector}>
              <div className={style.currencySelectorContent}>
                <h2>MAX</h2>
              </div>
            </div>
            <input
              type="range"
              className="
                  form-range
                  w-full
                  h-8
                  p-2
                  bg-white
                  focus:ring-0
                "
              min="0"
              max="100"
              id="customRange2"
            />
            <div className={style.currencySelector}>
              <div className={style.currencySelectorContent}>
                <h2>VAL</h2>
              </div>
            </div>
          </div>
        </div>
        <div>

          <div className={style.transferPropContainer}>
            <div className=" grid gap-4 grid-cols-2 place-items-center" >
              <h2>Val : </h2>
              <h2>
                {(typeof data.fees === 'undefined') ? (
                  <p>Loading</p>
                ) : (
                  <p >{data.fees}</p>
                )
                }
              </h2>
            </div>
            <div onClick={(e) => handleSubmit(e)} className={style.confirmButton}>
              Calculate
            </div>


          </div>

          {/* {(typeof data.members === 'undefined') ? (
            <p>Loading</p>
          ) : (
            data.members.map((member, i) => (
              <p key={i}>{member}</p>
            ))
          )} */}



        </div>
        {/* retrieved data will be shown here */}
      </div>
      <div className="border-spacing-10">




      </div>
    </div>


  )
}

export default main

function value(value: any): void {
  throw new Error('Function not implemented.');
}
