import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import {
  Container,
  useTheme,
  useMediaQuery,
  Paper,
  Dialog,
} from '@mui/material';
import Page from 'app/components/pages';
import { EventType, ViewType } from 'models/calendar-type';
import AddEditEventForm from './AddEditEventForm';
import Header from './Header';
import {
  getEvents,
  openModal,
  closeModal,
  selectRange,
  selectEvent,
  updateEvent,
} from 'features/calendar/calendarSlice';
import Toolbar from './Toolbar';

const CalendarView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { events, loading, error, isModalOpen, selectedRange } = useSelector(
    (state: RootState) => state.calendar,
  );

  const selectedEvent = useSelector(selectedEventSelector);
  const mobileDevice = useMediaQuery('(max-width:600px)');
  const [date, setDate] = useState<Date>(moment().toDate());
  const [view, setView] = useState<ViewType>(
    mobileDevice ? 'listWeek' : 'dayGridMonth',
  );
  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    dispatch<any>(getEvents());
  }, []);

  const handleAddClick = (): void => {
    dispatch<any>(openModal());
  };
  const handleModalClose = (): void => {
    dispatch<any>(closeModal());
  };

  /* calendarRef is a reference to the element FullCalendar*/
  const handleDateNext = (): void => {
    const calendarEl = calendarRef.current;
    /*the getApi here is part of FullCalendar. If you 'dot space' the  'calendarEl,' you'll see the interfaces or APIs available.  */
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };
  const handleDatePrev = (): void => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };
  const handleDateToday = (): void => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };
  const handleViewChange = (newView: ViewType): void => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };
  /*the arg: any - could be a string or a number */
  const handleEventSelect = (arg: any): void => {
    dispatch<any>(selectEvent(arg.event.id));
  };
  /*We have here a try-catch block because handleEventDrop is an async function */
  const handleEventDrop = async ({ event }: any): Promise<void> => {
    try {
      await dispatch<any>(
        updateEvent({
          allDay: event.allDay,
          start: event.start,
          end: event.end,
          id: event.id,
        } as any),
      );
    } catch (err) {
      console.error(err);
    }
  };
  const handleEventResize = async ({ event }: any): Promise<void> => {
    try {
      await dispatch<any>(
        updateEvent({
          allDay: event.allDay,
          start: event.start,
          end: event.end,
          id: event.id,
        } as any),
      );
    } catch (err) {
      console.error(err);
    }
  };
  const handleRangeSelect = (arg: any): void => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch<any>(selectRange(arg.start, arg.end));
  };

  return (
    <Page className={classes.root} title="Calendar">
      <Container maxWidth={false}>
        <Container maxWidth={false}>
          <Header onAddClick={handleAddClick} />
          <Toolbar
            date={date}
            onDateNext={handleDateNext}
            onDatePrev={handleDatePrev}
            onDateToday={handleDateToday}
            onViewChange={handleViewChange}
            view={view}
          />
          <Paper className={classes.calendar}>
            <FullCalendar
              allDayMaintainDuration
              droppable
              editable
              selectable
              weekends
              dayMaxEventRows
              eventResizableFromStart
              headerToolbar={false}
              select={handleRangeSelect}
              eventClick={handleEventSelect}
              eventDrop={handleEventDrop}
              eventResize={handleEventResize}
              initialDate={date}
              initialView={view}
              events={events}
              height={800}
              ref={calendarRef}
              rerenderDelay={10}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
                timelinePlugin,
              ]}
            />
          </Paper>
          <Dialog
            maxWidth="sm"
            fullWidth
            onClose={handleModalClose}
            open={isModalOpen}
          >
            {isModalOpen && (
              <AddEditEventForm
                event={selectedEvent}
                range={selectedRange}
                onAddComplete={handleModalClose}
                onCancel={handleModalClose}
                onDeleteComplete={handleModalClose}
                onEditComplete={handleModalClose}
              />
            )}
          </Dialog>
        </Container>
      </Container>
    </Page>
  );
};

const selectedEventSelector = (state: RootState): EventType | null => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events?.find(_event => _event.id === selectedEventId);
  } else {
    return null;
  }
};

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100%',
    paddingTop: useTheme().spacing(3),
    paddingBottom: useTheme().spacing(3),
  },
  calendar: {
    marginTop: useTheme().spacing(3),
    padding: useTheme().spacing(2),
    '& .fc-unthemed .fc-head': {},
    '& .fc-unthemed .fc-body': {
      backgroundColor: useTheme().palette.background.default,
    },
    '& .fc-unthemed .fc-row': {
      borderColor: useTheme().palette.divider,
    },
    '& .fc-unthemed .fc-axis': {
      ...useTheme().typography.body2,
    },
    '& .fc-unthemed .fc-divider': {
      borderColor: useTheme().palette.divider,
    },
    '& .fc-unthemed th': {
      borderColor: useTheme().palette.divider,
    },
    '& .fc-unthemed td': {
      borderColor: useTheme().palette.divider,
    },
    '& .fc-unthemed td.fc-today': {},
    '& .fc-unthemed .fc-highlight': {},
    '& .fc-unthemed .fc-event': {
      backgroundColor: useTheme().palette.secondary.main,
      color: useTheme().palette.secondary.contrastText,
      borderWidth: 2,
      opacity: 0.9,
      '& .fc-time': {
        ...useTheme().typography.h6,
        color: 'inherit',
      },
      '& .fc-title': {
        ...useTheme().typography.body1,
        color: 'inherit',
      },
    },
    '& .fc-unthemed .fc-day-top': {
      ...useTheme().typography.body2,
    },
    '& .fc-unthemed .fc-day-header': {
      ...useTheme().typography.subtitle2,
      fontWeight: useTheme().typography.fontWeightMedium,
      color: useTheme().palette.text.secondary,
      padding: useTheme().spacing(1),
    },
    '& .fc-unthemed .fc-list-view': {
      borderColor: useTheme().palette.divider,
    },
    '& .fc-unthemed .fc-list-empty': {
      ...useTheme().typography.subtitle1,
    },
    '& .fc-unthemed .fc-list-heading td': {
      borderColor: useTheme().palette.divider,
    },
    '& .fc-unthemed .fc-list-heading-main': {
      ...useTheme().typography.h6,
    },
    '& .fc-unthemed .fc-list-heading-alt': {
      ...useTheme().typography.h6,
    },
    '& .fc-unthemed .fc-list-item:hover td': {},
    '& .fc-unthemed .fc-list-item-title': {
      ...useTheme().typography.body1,
    },
    '& .fc-unthemed .fc-list-item-time': {
      ...useTheme().typography.body2,
    },
  },
}));

export default CalendarView;
