import React,{useState} from 'react'

// import "./styles.css"

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  wrapperForColumns: `grid gap-4 grid-cols-3 place-items-center auto-cols-max `,
  content: `bg-[#191B1F] w-[100rem] rounded-2xl p-5 `,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `w-64 justify-center bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#0a0b0d',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
}

// const [minValue, set_minValue] = useState(25);
// const [maxValue, set_maxValue] = useState(75);


const main = () => {
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
              className={style.transferPropInput}
              placeholder="0.0"
              pattern="^[0-9]*[.,]?[0-9]*$"
            // onChange={(e) => handleChange(e, 'amount')}
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
            // onChange={(e) => handleChange(e, 'amount')}
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
            // onChange={(e) => handleChange(e, 'amount')}
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
        

      </div>
      <div className="border-spacing-10">

        
          <div className={style.transferPropContainer}>
            <div className=" grid gap-4 grid-cols-2 place-items-center" >
              <h2>Val : </h2>
              <h2>0.0</h2>
            </div>
          </div>
        

        <div className={style.confirmButton}>
          Calculate
        </div>
        
      </div>
    </div>


  )
}

export default main