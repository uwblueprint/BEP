import React, { createRef, useEffect, useState } from 'react';
import { Event } from "../../data/types/EventTypes"
import { connect } from "react-redux";
import { fetchEventsService } from "../../data/services/eventsServices"
import { changeFilter } from "../../data/actions/eventsActions"
import { getFilteredEvents } from "../../data/selectors/eventsSelector";
import Typography from "@material-ui/core/Typography";
import EventCard from "./EventCard"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

type EventProps = {
    eventsFilter: any
}

interface StateProps {
    events: Event[],
}

interface DispatchProps {
    fetchEvents: any,
    changeFilter: any
}

type Props = StateProps & DispatchProps & EventProps

const mapStateToProps = (state: any): StateProps => ({
    events: getFilteredEvents(state.events),
})

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    fetchEvents: (limit: number, offset: number) => dispatch(fetchEventsService(limit, offset)),
    changeFilter: (filter: string) => dispatch(changeFilter(filter))
})

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Container>
                    <Box>
                        {children}
                    </Box>
                </Container>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const EducatorDashboard: React.SFC<Props> = ({ events, fetchEvents, changeFilter }: Props) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [retrievedData, setRetrievedData] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [prevY, setPrevY] = useState<number>(0);
    const [lastEventListLength, setLastEventListLength] = useState<number>(0);
    const [loadedAllEvents, setLoadedAllEvents] = useState<boolean>();
    const [offset, setOffset] = useState<number>(10);
    const [loadingRef, setLoadingRef] = useState(React.createRef());
    const [observer, setObserver] = useState<IntersectionObserver | null>(null);
    const [tabValue, setTabValue] = useState(0)

    useEffect(() => {
        fetchEvents(5, 0)
        setRetrievedData(true)

    }, [startDate]);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };


    const handleObserver = (entities: any, observer: IntersectionObserver) => {
        const y = entities[0].boundingClientRect.y;
        const newPage = page + 1;
        if (prevY > y) {
            if (lastEventListLength === events.length) {
                // If no new events are available, prevent additional calls to backend.
                setLoadedAllEvents(true);
            }

            if (!loadedAllEvents) {
                if (events.length > 1)
                    setLastEventListLength(events.length);

                fetchEvents(offset, newPage * offset);
                setPage(newPage);
            }
        }
        setPrevY(y);
    }

    if (loadingRef) {
        // Options
        var options = {
            root: null, // Page as root
            rootMargin: "0px",
            threshold: 1.0,
        };
        // Create an observer
        const observer = new IntersectionObserver(
            handleObserver, //callback
            options
        );

        //Observe the bottom div of the page
        // observer.observe(loadingRef.current);
        // setObserver(observer);
    }


    return (
        <React.Fragment>
            {console.log(retrievedData)}
            <Typography variant="h3">Your Opportunities</Typography>

            <div>
                <AppBar position="static">
                    <Tabs value={tabValue} indicatorColor="secondary" onChange={handleTabChange} aria-label="simple tabs example">

                        <Tab onClick={() => changeFilter("ACTIVE")} label="CURRENT" {...a11yProps(0)} />
                        <Tab onClick={() => changeFilter("PAST")} label="PAST" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={tabValue} index={1}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            placeholder="Start date"
                            value={startDate}
                            onChange={date => setStartDate(date)}
                            format="yyyy/MM/dd"
                        />
                    </MuiPickersUtilsProvider>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            placeholder="End date"
                            value={endDate}
                            onChange={date => setEndDate(date)}
                            format="yyyy/MM/dd"
                        />
                    </MuiPickersUtilsProvider>
                </TabPanel>
            </div>
            <div>

                {events.length !== 0 && retrievedData
                    ? events
                        .filter((event, index) =>
                            (new Date(event.startDate) > new Date('2019-07-01T21:11:54')) //test
                        )
                        .map((event, index) =>
                            <EventCard key={index} event={event} />
                        ) :
                    <div>
                        <p>You do not currently have any listed opportunities.
                            Click 'Create Opportunity' to get started!</p>
                    </div>
                }

            </div>

        </React.Fragment >
    )
}

export default connect<StateProps, DispatchProps, EventProps>(mapStateToProps, mapDispatchToProps)(EducatorDashboard);