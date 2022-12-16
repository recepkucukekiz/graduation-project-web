import React, {Component, Button, useState, useEffect} from 'react';
import "./calendarv2.css"

const Calendarv2 = () => {

    // const [test, setTest] = React.useState("abc");

    // useEffect(() => {
    //     console.log("component her render olduğunda çalışır");
    // });

    // useEffect(() => {
    //     console.log("component ilk yüklendiğinde çalışır");
    //     return () => {
    //         console.log("component destroy olduğunda çalışır");
    //     }
    // }, []);

    // useEffect(() => {
    //     console.log("test değişkenini takip eder ve test her değiştiğinde çalışır, yeniden render alır");
    // }, [test]);

    const [test, setTest] = React.useState("abc");
    const [isFecthed, setIsFetched] = React.useState(false);

    const sleep = (ms) => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    useEffect(() => {
        fetchTest();
    }, []);

    const fetchTest = async () => {
        await sleep(1000);
        // fetch("http://localhost:3000/api/test")
        // .then(res => res.json())
        // .then(
        //     (result) => {
        //         setTest(result);
        //         setIsFetched(true);
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // )
        setTest("OK");
        setIsFetched(true);
    }

    const loading = (
        <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>
    )

    const renderTest = (
        <div>
            {test}
        </div>
    )

    const calendar = (
        <div className='d-flex'>
            <div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
                <div>time</div>
            </div>
            <div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
                <div className='calendar-cell'></div>
            </div>
            <div>salı</div>
            <div>crsmba</div>
            <div>persembe</div>
            <div>cuma</div>
            <div>cmrtsi</div>
            <div>pazar</div>
        </div>
    )



    return (
        <div className="calendarv2">
            {isFecthed ? calendar : loading}
        </div>
    )

}

export default Calendarv2;
