import React from 'react'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function InfoBox({ title, cases, total }) {
    return (
        <Card className="InfoBox">
            <Card.Body>
                <Card.Title className='infoBox-title text-secondary'>{title}</Card.Title>
                <h2 className='infoBox-cases'>{cases}</h2>
                <p className='infoBox-total text-secondary'>{total} Total</p>
            </Card.Body>
        </Card>
    )
}

export default InfoBox