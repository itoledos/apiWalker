import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap';

const DataList = (props) => {
    const dataList = [
        "planets", 
        "starships", 
        "vehicles", 
        "people", 
        "films", 
        "species"
    ]

    const [selectedData, setSelectedData] = useState('planets');
    const [selectedId, setSelectedId] = useState('');
    const [selectedUrl, setSelectedUrl] = useState('https://swapi.dev/api/people/1/?format=json')
    const [activeQuery, setActiveQuery] = useState({})
    const [shownQuery, setShownQuery] = useState(false)
    const errorMsg = () => {
        return(
            <Row key={99}>
                <p>'Estos no son los droides que está buscando'</p>
                {/* <img src='./luke.png'>luke skywalker</img> */}
            </Row>
            )
    }

    const handleSelectedData = (e) => {
        e.preventDefault();
        setSelectedData(e.target.value)
    }

    const handleSelectedId = (e) => {
        e.preventDefault();
        setSelectedId(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSelectedUrl(`https://swapi.dev/api/${selectedData}/${selectedId}/?format=json`)
        setShownQuery(selectedId!='');
    }

    useEffect(() => {
        fetch(selectedUrl)
            .then(response => response.json())
            .then(resp => setActiveQuery(resp))
            .catch(err => console.log('Error'))
    }, [selectedUrl]);

    return(
        <React.Fragment>
            <Row>
                <Col sm="1"></Col>
                <Col sm="6">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label> Select Data: </Form.Label>
                            <Form.Select onChange={handleSelectedData} value={selectedData}>
                                {dataList.map((itm,idx)=>
                                    <option key={idx}>
                                        {[itm]}
                                    </option>
                                )}
                            </Form.Select>
                            <Form.Label> Id: </Form.Label>
                            <Form.Control
                                as='input'
                                type="text"
                                disabled={false}
                                onChange={handleSelectedId}
                                value={selectedId}
                                >
                            </Form.Control>
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                        >
                                Submit
                        </Button>
                    </Form>
                </Col>
                <Col sm="1"></Col>
            </Row>
            <Row>
                <Col sm="1"></Col>
                <Col sm="6">

                    {shownQuery && Object.entries(activeQuery).map(([key,value],idx)=> {
                        if(idx>3) {
                            return('')
                        } else if(value == 'Not found') {
                            return(
                                <Row key={99}>
                                    <p>Estos no son los droides que está buscando</p>
                                    <img src={'https://icon-library.com/images/luke-skywalker-icon/luke-skywalker-icon-8.jpg'} alt='Luke Skywalker' />
                                </Row>
                                )
                        } else {
                            return(
                                
                                <Row key={idx}>
                                        {key} : {value} 
                                </Row>
                            )

                        }
                    }
                    )}

                </Col>
                <Col sm="1"></Col>
            </Row>

        </React.Fragment>
    )
}
export default DataList;