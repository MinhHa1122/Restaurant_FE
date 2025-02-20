import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { Cookies } from 'react-cookie';
import { QRCodeSVG } from 'qrcode.react';
import './CreateQr.scss'
function App() {
  const cookies = new Cookies
  const [url, setUrl] = useState('');
  const [urlType, setUrlType] = useState(null);
  const [urlTable, setUrlTable] = useState(null);
  const [types, setTypes] = useState([])
  const [tables, setTables] = useState([])
  const qrContent = useRef()
  async function createQR(IdTable, IdType) {
    try {
      const response = await axios.post('http://localhost:8080/api/v12/createqr', { IdTable: IdTable, IdType: IdType, token: cookies.get('AccessTokenAdmin') })
      if (response.data.massege === 'Thanh cong') {
        const urln = `${process.env.REACT_APP_IP_CLIENT}/order?token=${response.data.token}`
        setUrl(urln)
        qrContent.current.classList.add('open')
      }
    } catch (error) {
      alert('Có lõi xảy ra vui lòng thử lại')
    }
  }
  useEffect(() => {
    axios.all([
      axios.get('http://localhost:8080/api/v12/showtypeorder'),
      axios.get('http://localhost:8080/api/v12/showtableqr'),
    ])
      .then(axios.spread((Type, Table,) => {
        setTypes(Type.data.data)
        setTables(Table.data.data)
      }))
      .catch(err => {
        console.error()
      })
  }, [])
  const handleClickCreateQR = () => {
    if (urlType !== null && urlTable !== null) {
      createQR(urlTable, urlType)
    }
    else {
      alert('Vui lòng chọn bàn và gói')
    }
  };
  return (
    <>
      <div className='createqr_container'>
        <h1>QR Code Generator</h1>
        <div className='createqr_content'>
          <select className='createqr_content-type' onChange={e => setUrlType(e.target.value)}>
            <option>Chọn Gói</option>
            {types.map((type, i) => (
              (type.Name === '' ?
                (
                  <option value={type.Id} key={i}>Gọi món</option>
                ) : (
                  <option value={type.Id} key={i}>{type.Name}</option>
                ))
            ))}
          </select>
          <select onChange={e => setUrlTable(e.target.value)} className='createqr_content-table'>
          <option>Chọn bàn</option>
            {tables.map((table, i) => (
              <option value={table.Id} key={i}>{table.Name}</option>
            ))}
          </select>
        </div>
        <button onClick={handleClickCreateQR} className='button_createqr'>Tạo QR</button>
        <div ref={qrContent} className='Qr_content' style={{ marginTop: '20px' }}>
          <QRCodeSVG value={url} size={256} />
        </div>
      </div>
    </>
  );
}

export default App;