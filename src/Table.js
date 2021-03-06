import React from 'react'
import './Table.css'

function Table({ countries }) {
    return (
        <div className='Table'>
            <table>
                <tbody>
                    {countries.map(({ country, cases }) => (
                        <tr key={country}>
                            <td>{country}</td>
                            <td>
                                <strong>{cases}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table