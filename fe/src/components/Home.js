import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader } from 'semantic-ui-react';
import PactContext from "../contexts/PactContext";


const Home = () => {

  const pactContext = useContext(PactContext);

  useEffect(() => {
    async function pactFetch() {
      await pactContext.getCoinBalance();
      await pactContext.getCWBalance();
      await pactContext.getKuroBalance();
    }
    pactFetch();
  }, [])

  const pactFecth = async () => {
    await pactContext.getCoinBalance();
    await pactContext.getCWBalance();
    await pactContext.getKuroBalance();
  }

  const [amountBuy, setAmountBuy] = useState("");
  const [amountSell, setAmountSell] = useState("");
  const [amountToCW, setAmountToCW] = useState("");
  const [amountToKuro, setAmountToKuro] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferTo, setTransferTo] = useState("");

  // const isDecimal = (str) => {
  //
  // }

  return (
    <Grid columns={2} padded scrollable verticalAlign="top">
      <Grid.Column textAlign="center" style={{overflow: "auto"}}>
        <img src={require("../kadena.png")} style={{height:70, marginTop: 50}}/>
        <Header as="h6" style={{color:'black', fontWeight: 'bold', fontSize: 40, marginTop: 20}}>
          Kadena Hybrid Demo
        </Header>
      </Grid.Column>
      <Grid.Column style={{overflow: "auto", backgroundColor: "#f4aa3c"}}>
        <Form>
          <Header as="h6" style={{color:'white', fontWeight: 'bold', fontSize: 30, marginTop: 30, textAlign: 'center'}}>
            Chainweb Functions
          </Header>
          <Form.Field  style={{width:"440px", margin: "0 auto", marginTop: "10px"}} >
            <label style={{color: "white"}}>Buy Hybrid Token (KDA -> HT)
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>What is Buying Hybrid Token? </Popup.Header>
                <Popup.Content>When you buy a Hybrid Token, you are trading your KDA 1:1 with this new currency that is spendable in the Kuro private blockchain. You will not have access to these funds until you transfer it to kuro. Note that you can always convert back to KDA at the same 1:1 ratio.</Popup.Content>
              </Popup>
            </label>
              <Form.Input
                style={{width:"440px"}}
                icon='dollar sign'
                iconPosition='left'
                placeholder='Amount to Buy'
                value={amountBuy}
                onChange={(e) => setAmountBuy(e.target.value)}
              />
          </Form.Field>
          <Form.Field  style={{width:"440px", margin: "0 auto", marginTop: "10px"}} >
            <label style={{color: "white"}}>Sell Hybrid Token (HT -> KDA)
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>What is Selling Hybrid Token? </Popup.Header>
                <Popup.Content>When you sell Hybrid Token, you are converting it back to KDA at a 1:1 ratio. Please note you need to have that amount of Hybrid Token on the Chainweb side before cashing out. If you still have the balance on Kuro, please transfer it to Chainweb before attempting to cash out.</Popup.Content>
              </Popup>
            </label>
              <Form.Input
                style={{width:"440px"}}
                icon='dollar sign'
                iconPosition='left'
                placeholder='Amount to Sell'
                value={amountSell}
                onChange={(e) => setAmountSell(e.target.value)}
              />
          </Form.Field>
          <Form.Field  style={{width:"440px", margin: "0 auto", marginTop: "10px"}} >
            <label style={{color: "white"}}>Transfer Token to Kuro (Chainweb -> Kuro)
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>What is Transfering To Kuro? </Popup.Header>
                <Popup.Content>Transfering to Kuro allows you to spend transfer and spend your Hybrid Token in the Kuro ecosystem, which comes with the speed and benefits of a private chain. For example, you can pay others within the Kuro ecosystem in an instant manner (no more need to wait for mined blocks!)</Popup.Content>
              </Popup>
            </label>
              <Form.Input
                style={{width:"440px"}}
                icon='exchange'
                iconPosition='left'
                placeholder='Amount to Transfer to Kuro'
                value={amountToKuro}
                onChange={(e) => setAmountToKuro(e.target.value)}
              />
          </Form.Field>
        </Form>
        <Form>
          <Header as="h6" style={{color:'white', fontWeight: 'bold', fontSize: 30, marginTop: 30, textAlign: 'center'}}>
            Kuro Functions
          </Header>
          <Form.Field  style={{width:"440px", margin: "0 auto", marginTop: "10px"}} >
            <label style={{color: "white"}}>Transfer Token to Chainweb (Kuro -> Chainweb)
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>What is Transfering To Chainweb? </Popup.Header>
                <Popup.Content>Transfering to Chainweb allows you to transfer Hybrid Token accumulated on Kuro that is then convertible back to KDA at a 1:1 ratio on the Chainweb side</Popup.Content>
              </Popup>
            </label>
              <Form.Input
                style={{width:"440px"}}
                icon='exchange'
                iconPosition='left'
                placeholder='Amount to Transfer to Chainweb'
                value={amountToCW}
                onChange={(e) => setAmountToCW(e.target.value)}
              />
          </Form.Field>
          <Form.Field  style={{width:"440px", margin: "0 auto", marginTop: "10px", marginBottom: 400}} >
            <label style={{color: "white"}}>Transfer to accounts within Kuro
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>What is Transfering To Chainweb? </Popup.Header>
                <Popup.Content>Transfering to Chainweb allows you to transfer Hybrid Token accumulated on Kuro that is then convertible back to KDA at a 1:1 ratio on the Chainweb side</Popup.Content>
              </Popup>
            </label>
              <Form.Input
                style={{width:"440px"}}
                icon='user'
                iconPosition='left'
                placeholder='Account Name'
                value={amountToCW}
                onChange={(e) => setAmountToCW(e.target.value)}
              />
              <Form.Input
                style={{width:"440px"}}
                icon='dollar sign'
                iconPosition='left'
                placeholder='Amount'
                value={amountToCW}
                onChange={(e) => setAmountToCW(e.target.value)}
              />
          </Form.Field>
        </Form>
      </Grid.Column>
    </Grid>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //     <p>
  //       KADENA HYBRID BLOCKCHAIN DEMO
  //     </p>
  //     <text>log-in below:</text>
  //     <input value={pactContext.accountName} onChange={(e) => pactContext.setAccountName(e.target.value)}/>
  //     <Button onClick={() => pactFecth()}>
  //       login
  //     </Button>
  //       <p style={{ color: "red" }}>
  //         Kadena Coin Balance: {pactContext.coinBalance}
  //       </p>
  //       <p style={{ color: "green" }}>
  //         Hybrid Token Balance (Chainweb): {pactContext.cwBalance}
  //       </p>
  //       <text>enter amount to buy (Kadena -> HT)</text>
  //       <input value={amountBuy} onChange={(e) => setAmountBuy(e.target.value)}/>
  //       <Button
  //         disabled={amountBuy ? false : true}
  //         onClick={() => {
  //           pactContext.buyHT(amountBuy)}}>
  //         buy hybrid token
  //       </Button>
  //       <br></br>
  //       <text>enter amount to sell (HT -> Kadena)</text>
  //       <input value={amountSell} onChange={(e) => setAmountSell(e.target.value)}/>
  //       <Button
  //         disabled={amountSell ? false : true}
  //         onClick={() => {
  //         pactContext.sellHT(amountSell)}}>
  //         sell hybrid token
  //       </Button>
  //       <p style={{ color: "green" }}>
  //         Hybrid Token Balance (Kuro): {pactContext.kuroBalance}
  //       </p>
  //       <text>enter amount to transfer (CW -> Kuro)</text>
  //       <input value={amountToKuro} onChange={(e) => setAmountToKuro(e.target.value)}/>
  //       <Button
  //         disabled={amountToKuro ? false : true}
  //         onClick={() => {
  //         pactContext.transferCWKuro(amountToKuro)}}>
  //         transfer chainweb -> kuro
  //       </Button>
  //       <br></br>
  //       <text>enter amount to transfer (Kuro -> CW)</text>
  //       <input value={amountToCW} onChange={(e) => setAmountToCW(e.target.value)}/>
  //       <Button
  //         disabled={amountToCW ? false : true}
  //         onClick={() => {
  //         pactContext.transferKuroCW(amountToCW)}}>
  //         transfer kuro -> chainweb
  //       </Button>
  //       <br></br>
  //       <text>enter amount to transfer within Kuro</text>
  //       <input value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)}/>
  //       <text>account</text>
  //       <input value={transferTo} onChange={(e) => setTransferTo(e.target.value)}/>
  //       <Button
  //         disabled={(transferAmount && transferTo) ? false : true}
  //         onClick={() => {
  //         pactContext.transferInKuro(transferTo, transferAmount)}}>
  //         transfer within kuro
  //       </Button>
  //     </header>
  //   </div>
  // );
}

export default Home;
