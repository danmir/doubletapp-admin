import React, { Component } from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import myApiRestClient from '../restClient';

import { EventList, EventCreate } from './Events';
import { AdvCampaignList, AdvCampaignCreate } from './AdvCampaign';

const App = () => (
    <Admin restClient={myApiRestClient}>
        <Resource name="events" list={EventList} create={EventCreate} />
        <Resource name="advcampaign" list={AdvCampaignList} create={AdvCampaignCreate} />
    </Admin>
);

export default App;
