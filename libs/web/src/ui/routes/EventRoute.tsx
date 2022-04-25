import { Collapse, PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpEvent } from '@moxy-js/dto';

const { Panel } = Collapse;

interface HttpEventViewModel {}

const EventRoute = () => {
  const history = useHistory();
  const [events, setEvents] = useState<Map<string, HttpEvent>>(new Map<string, HttpEvent>());

  const onmessage = (event: MessageEvent) => {
    const httpEvent = JSON.parse(event.data);

    setEvents((events) => events.set(httpEvent.id, httpEvent));
    console.log(httpEvent);
  };

  const onerror = (error: Event) => {
    console.error(error);
  };

  useEffect(() => {
    const eventsListener = new EventSource('http://localhost:3500/api/events');
    eventsListener.onerror = onerror;
    eventsListener.onmessage = onmessage;

    return () => eventsListener.close();
  }, []);

  return (
    <>
      <PageHeader className={'content-header'} onBack={() => history.goBack()} title={'Events'} subTitle={''} />

      <Collapse>
        {Array.from(events.values()).map((event: HttpEvent, index) => (
          <Panel header={`${event.method} ${event.baseUrl}`} key={index}>
            <p>{JSON.stringify(event, undefined, 2)}</p>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default EventRoute;
