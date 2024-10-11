// import React{useEffect} from "react";
import { Button, Card, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { RiBitCoinLine} from 'react-icons/ri';

function Convertor() {
  const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";
  const [cryptolist, setcryptolist] = useState([]);

  const defaultfirstSelectValue = "Bitcoin";
  const defaultSecondSelectValue = "Ether";

  const [inputValue, setInputValue] = useState("0");

  const [firstSelect, setFirstSelect] = useState(defaultfirstSelectValue);
  const [secondSelect, setSecondSelect] = useState(defaultSecondSelectValue);
  const [result,setResult]=useState("0");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (cryptolist.length === 0) {
      return;
    }
    const firstObjRate = cryptolist.find((item) => {
      return item.value === firstSelect;
    }).rate;
    const secondObjRate = cryptolist.find((item) => {
      return item.value === secondSelect;
    }).rate;

    const resultValue=(inputValue* secondObjRate)/firstObjRate;

    setResult(resultValue);


  }, [inputValue, firstSelect, secondSelect]);

  async function fetchData() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();

    const data = jsonData.rates;

    // Object.entries(data).forEach(item=>{
    //     const tempObj={
    //         value: item[1].name,
    //         label:item[1].name,
    //         rate:item[1].value,
    //     }
    //     tempArray.push(tempObj)

    // })
    // console.log(tempArray);
    const tempArray = Object.entries(data).map((item) => {
      return {
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value,
      };
    });

    setcryptolist(tempArray);
  }

  return (
    <div className="container">
      <Card className="crypto-card" title={<h1> <RiBitCoinLine/> Crypto-Convertor</h1>}>
        <Form>
          <Form.Item>
            <Input
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            />
          </Form.Item>
        </Form>
        <div className="select-box">
          <Select
            style={{ width: "120px" }}
            defaultValue={defaultfirstSelectValue}
            options={cryptolist}
            onChange={(value) => setFirstSelect(value)}
          />
          <Select
            style={{ width: "120px" }}
            defaultValue={defaultSecondSelectValue}
            options={cryptolist}
            onChange={(value) => setSecondSelect(value)}
          />
        </div>
        <p style={{ fontWeight: "bold" }}>
          {inputValue} {firstSelect}= {result} {secondSelect}</p>
      </Card>
    </div>
  );
}

export default Convertor;