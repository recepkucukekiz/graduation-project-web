import { Calendar } from "@progress/kendo-react-dateinputs";
import { useEffect, useRef, useState } from "react";
import { createCustomer, customerObjbuilder, appointmentObjBuilder,createAppointment } from "../../services/shopservice";
import "./picker.css";

const times = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
];

const getRandomNumInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const pickSlotTimes = times => {
    return times;
    // // Get a random number that will indicate how many time slots we pick
    // const timesToPick = getRandomNumInRange(0, times.length);

    // // If the random picked is the maximum possible then return all times
    // if (timesToPick === times.length - 1) {
    //     return times;
    // }

    // let timesPicked = [];

    // // Loop until we have picked specified number of times
    // while (timesToPick !== timesPicked.length - 1) {
    //     // Get a new index and time
    //     const index = getRandomNumInRange(0, times.length);
    //     const selectedTime = times[index];
    //     // If we already picked that time we continue
    //     // as we don't want duplicated
    //     if (timesPicked.includes(selectedTime)) continue;
    //     // Keep the time
    //     timesPicked.push(selectedTime);
    // }

    // // We need to sort the times, as they may not be in a correct order
    // return timesPicked.sort();
};

const AvailabilityPicker = props => {
    const [bookingDate, setBookingDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [bookingTimes, setBookingTimes] = useState([]);
    const timeSlotCacheRef = useRef(new Map());
    const [selectedTimeSlotElement, setSelectedTimeSlotElement] = useState(null);
    const [customerName, setCustomerName] = useState(null);
    const [customerSurname, setCustomerSurname] = useState(null);
    const [customerPhone, setCustomerPhone] = useState(null);
    const [customerEmail, setCustomerEmail] = useState(null);
    const [customerResponse, setCustomerResponse] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    console.log(
        `You selected ${props.service} from ${props.worker}`
    );

    function makeBooking() {
        if (!bookingDate || !selectedTimeSlot || !customerName || !customerPhone || !customerEmail) {
            console.log("Please select a date and time slot and enter your name, phone and email.");
            return;
        }

        var customerObj = customerObjbuilder(customerName, customerSurname, customerEmail, customerPhone)
        var appointmentObj = appointmentObjBuilder(selectedTimeSlot, selectedTimeSlot, bookingDate, 0, props.worker)
        createCustomer(customerObj).then((response) => {
            setCustomerResponse(response)
            appointmentObj.customerId = response.customerId
            console.log(response)
        }).then(() => {
            console.log(appointmentObj)
            createAppointment(appointmentObj).then((response) => {
                setShowPopup( showPopup => !showPopup)
                console.log(response)
            })
        })


        console.log(
            `You have booked a slot on ${bookingDate.toDateString()} at ${selectedTimeSlot} for ${props.service} from ${props.worker} with ${customerName} ${customerPhone} ${customerEmail}`
        );
    };

    useEffect(() => {
        // Bail out if there is no date selected
        if (!bookingDate) return;

        // Get time slots from cache
        let newBookingTimes = timeSlotCacheRef.current.get(
            bookingDate.toDateString()
        );

        // If we have no cached time slots then pick new ones
        if (!newBookingTimes) {
            newBookingTimes = pickSlotTimes1();
            // Update cache with new time slots for the selected date
            timeSlotCacheRef.current.set(bookingDate.toDateString(), newBookingTimes);
        }

        setBookingTimes(newBookingTimes);
    }, [bookingDate]);

    useEffect(() => {
        if (selectedTimeSlotElement) {
            selectedTimeSlotElement.style.backgroundColor = '#272827';
            selectedTimeSlotElement.style.color = 'white';
        }
    }, [selectedTimeSlotElement])

    const onDateChange = e => {
        setSelectedTimeSlot(null);
        setBookingDate(e.value);
        console.log(e.value.toDateString());
    };

    const pickSlotTimes1 = () => {
        var wt = props.workingTime
        console.log(wt);
        var start = wt.split("-")[0]
        var end = wt.split("-")[1]
        var startHour = parseInt(start.split(":")[0])
        var endHour = parseInt(end.split(":")[0])

        var timesArr = []
        for (var i = startHour; i < endHour; i++) {
            timesArr.push(i + ":00 - " + (i + 1) + ":00")
        }

        return timesArr
    }

    const confirmationView = (
        <>
            <p>
                You selected {props.service} from {props.worker} {bookingDate != null ? "for " + bookingDate.toDateString() : ""} {selectedTimeSlot}.
            </p>
            <p>Are you sure about confirm booking?</p>
            <input
                type="text"
                placeholder="Enter your name and surname"
                className="input-box"
                onChange={
                    (e) => setCustomerName(e.target.value)
                }
                onEmptied={
                    (e) => setCustomerName(null)
                }
            />
            <input
                type="text"
                placeholder="Enter your phone number"
                className="input-box"
                onChange={
                    (e) => setCustomerPhone(e.target.value)
                }
                onEmptied={
                    (e) => setCustomerPhone(null)
                }
            />
            <input
                type="text"
                placeholder="Enter your email"
                className="input-box"
                onChange={
                    (e) => setCustomerEmail(e.target.value)
                }
                onEmptied={
                    (e) => setCustomerEmail(null)
                }
            />

            <input type="button" value="Confirm" className="btn button"
                onClick={() => makeBooking()}
            />
        </>
    );

    return (
        <>
        {showPopup ? <div>abjkdch</div> : null}
            <p className="frame">You selected {props.service} from {props.worker} {bookingDate != null ? "for " + bookingDate.toDateString() : ""} {selectedTimeSlot}.</p>
            <div className="k-my-8">
                {/* <div className="k-mb-4 k-font-weight-bold">Choose Date</div> */}

                <div className="d-flex justify-content-around">

                    <div className="col-lg-4">
                        <Calendar value={bookingDate} onChange={onDateChange} />
                    </div>

                    <div className="col-lg-4">
                        {bookingDate ?

                            <div className="k-ml-4 k-display-flex k-flex-col">
                                {bookingTimes.map(time => {
                                    return (
                                        <button
                                            key={time}
                                            className="timeslot"
                                            onClick={(e) => {
                                                setSelectedTimeSlot(time);
                                                if (selectedTimeSlotElement) {
                                                    selectedTimeSlotElement.style.backgroundColor = 'white';
                                                    selectedTimeSlotElement.style.color = 'black';
                                                }
                                                setSelectedTimeSlotElement(e.target);
                                            }}
                                        >
                                            {time}
                                        </button>
                                    );
                                })}
                            </div>

                            : "Select a date to see available time slots"}
                    </div>

                    <div className="col-lg-4" style={{ "padding-left": "2rem" }}>
                        {selectedTimeSlot !== null ? confirmationView : "Select time slot"}
                    </div>

                </div>

                {/* {bookingDate && selectedTimeSlot ? (
      <div>
        Selected slot: {bookingDate.toDateString()} at {selectedTimeSlot}
      </div>
    ) : null} */}


            </div></>
    );
};

export default AvailabilityPicker;
