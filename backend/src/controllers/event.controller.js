const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const eventService = require('@/services/event.service');
const enrollmentService = require('@/services/enrollment.service');
const personnelService = require('@/services/personnel.service');

const getEvents = async (req, res) => {
  const events = await eventService.getEvents();

  const promises = [];
  for (let e = 0; e < events.length; e += 1) {
    promises.push(eventService.getResponsesForEvent(events[e].id).then((responses) => {
      const responseObject = {
        going: 0,
        notGoing: 0,
      };

      responses.map((response) => {
        if (response.response_code === 0) {
          responseObject.notGoing += 1;
        } else if (response.response_code === 1) {
          responseObject.going += 1;
        }

        return response.response_code;
      });

      return responseObject;
    })
      .then((responsesObject) => { events[e].responses = responsesObject; }));

    promises.push(personnelService.getPersonnelById(events[e].created_by)
      .then((personnelObject) => { events[e].createdByObject = personnelObject; }));
  }
  await Promise.all(promises);

  res.send(200, events);
};

const getEventsByBase = async (req, res) => {
  const events = await eventService.getEventsByBase(req.params.base_id);

  const promises = [];
  for (let e = 0; e < events.length; e += 1) {
    promises.push(eventService.getResponsesForEvent(events[e].id).then((responses) => {
      const responseObject = {
        going: 0,
        notGoing: 0,
      };

      responses.map((response) => {
        if (response.response_code === 0) {
          responseObject.notGoing += 1;
        } else if (response.response_code === 1) {
          responseObject.going += 1;
        }

        return response.response_code;
      });

      return responseObject;
    })
      .then((responsesObject) => { events[e].responses = responsesObject; }));

    promises.push(personnelService.getPersonnelById(events[e].created_by)
      .then((personnelObject) => { events[e].createdByObject = personnelObject; }));
  }
  await Promise.all(promises);

  res.send(200, events);
};

const getEventsAtMyBase = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));
  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  const person = await personnelService.getPersonnelById(enrollment.personnel_id);
  const events = await eventService.getEventsByBase(person.base_id);

  const promises = [];
  for (let e = 0; e < events.length; e += 1) {
    promises.push(eventService.getResponsesForEvent(events[e].id).then((responses) => {
      const responseObject = {
        going: 0,
        notGoing: 0,
      };

      responses.map((response) => {
        if (response.response_code === 0) {
          responseObject.notGoing += 1;
        } else if (response.response_code === 1) {
          responseObject.going += 1;
        }

        return response.response_code;
      });

      return responseObject;
    })
      .then((responsesObject) => { events[e].responses = responsesObject; }));

    promises.push(personnelService.getPersonnelById(events[e].created_by)
      .then((personnelObject) => { events[e].createdByObject = personnelObject; }));
  }
  await Promise.all(promises);

  res.send(200, events);
};

const getEventsCreatedBy = async (req, res) => {
  const events = await eventService.getEventsByCreator(req.params.personnel_id);

  const promises = [];
  for (let e = 0; e < events.length; e += 1) {
    promises.push(eventService.getResponsesForEvent(events[e].id).then((responses) => {
      const responseObject = {
        going: 0,
        notGoing: 0,
      };

      responses.map((response) => {
        if (response.response_code === 0) {
          responseObject.notGoing += 1;
        } else if (response.response_code === 1) {
          responseObject.going += 1;
        }

        return response.response_code;
      });

      return responseObject;
    })
      .then((responsesObject) => { events[e].responses = responsesObject; }));

    promises.push(personnelService.getPersonnelById(events[e].created_by)
      .then((personnelObject) => { events[e].createdByObject = personnelObject; }));
  }
  await Promise.all(promises);

  res.send(200, events);
};

const getEventsCreatedByMe = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));
  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  const events = await eventService.getEventsByCreator(enrollment.personnel_id);

  const promises = [];
  for (let e = 0; e < events.length; e += 1) {
    promises.push(eventService.getResponsesForEvent(events[e].id).then((responses) => {
      const responseObject = {
        going: 0,
        notGoing: 0,
      };

      responses.map((response) => {
        if (response.response_code === 0) {
          responseObject.notGoing += 1;
        } else if (response.response_code === 1) {
          responseObject.going += 1;
        }

        return response.response_code;
      });

      return responseObject;
    })
      .then((responsesObject) => { events[e].responses = responsesObject; }));

    promises.push(personnelService.getPersonnelById(events[e].created_by)
      .then((personnelObject) => { events[e].createdByObject = personnelObject; }));
  }
  await Promise.all(promises);

  res.send(200, events);
};

const getEventById = async (req, res) => {
  const evnt = await eventService.getEventById(parseInt(req.params.id, 10));

  evnt.responses = await eventService.getResponsesForEvent(evnt.id).then((responses) => {
    const responseObject = {
      going: 0,
      notGoing: 0,
    };

    responses.map((response) => {
      if (response.response_code === 0) {
        responseObject.notGoing += 1;
      } else if (response.response_code === 1) {
        responseObject.going += 1;
      }

      return response.response_code;
    });

    return responseObject;
  });

  evnt.createdByObject = await personnelService.getPersonnelById(evnt.created_by);

  res.send(200, evnt);
};

const createEvent = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  const enrolledPerson = await personnelService.getPersonnelById(enrollment.personnel_id);
  await eventService.createEvent(
    enrolledPerson.base_id,
    enrollment.personnel_id,
    req.body.scheduled,
    req.body.location,
    req.body.subject,
    req.body.description,
  );
  res.send(200);
};

const setResponse = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  if (enrollment === null) {
    res.send(500);
  } else {
    await eventService.setResponse(
      req.body.eventId,
      enrollment.personnel_id, // Use this as an example!
      req.body.responseCode,
    );
    res.send(200);
  }
};

module.exports = {
  getEvents,
  getEventsByBase,
  getEventsAtMyBase,
  getEventsCreatedBy,
  getEventsCreatedByMe,
  getEventById,
  createEvent,
  setResponse,
};
