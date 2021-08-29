import React, { useRef } from 'react';
import moment from 'moment';

import FullCalendar, { DayCellContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';

interface IMonthCalendarProps {
    setDate: React.Dispatch<React.SetStateAction<string>>;
    rest?: FullscreenOptions;
}

const MonthCaldendar = ({ setDate, ...rest }: IMonthCalendarProps): JSX.Element => {
    const calendarEl: React.LegacyRef<FullCalendar> = useRef(null);

    const customDayCell = (dayCellContent: DayCellContentArg) => {
        return <>{dayCellContent.dayNumberText.replace('일', '')}</>;
    };

    const onClickDate = (arg: DateClickArg) => {
        setDate(arg.dateStr);
    };

    const onClickCustomToday = () => {
        const calendar = calendarEl.current;

        if (calendar) {
            calendar.getApi().today();
            setDate(moment().format('YYYY-MM-DD'));
        }
    };

    return (
        <FullCalendar
            {...rest}
            ref={calendarEl}
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'title',
                right: 'customToday,prev,next',
            }}
            customButtons={{
                customToday: {
                    text: '오늘',
                    click: onClickCustomToday,
                },
            }}
            locale={koLocale}
            initialView="dayGridMonth"
            selectable={true}
            dateClick={onClickDate}
            dayCellContent={customDayCell}
            rerenderDelay={0}
            height={450}
        />
    );
};

export default MonthCaldendar;
