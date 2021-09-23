# 🗃️ State Management

There is no need to keep all of your state in a single centralized state. There are different needs for different types of state that can be split into several types:

## UI State

This is the state that controls interactive parts of an application. Opening modals, notifications, changing color mode, etc. For best performance and maintainability, keep the state as close as possible to the components that are using it. Don't make everything global out of the box.

Good UI State Libraries:

- [Context](https://reactjs.org/docs/context.html) + [hooks](https://reactjs.org/docs/hooks-intro.html)
- [zustand](https://github.com/pmndrs/zustand)
- [constate](https://github.com/diegohaz/constate)
- [redux](https://redux.js.org/)
- [mobx](https://mobx.js.org)
- [jotai](https://github.com/pmndrs/jotai)
- [recoil](https://recoiljs.org/)

[UI State Example Code](../src/stores/notifications.js)

## Server Cache State

This is the state that comes from the server which is being cached on the client for further usage. It is possible to store remote data inside a state management store such as redux, but there are better solutions for that.

Good Server Cache Libraries:

- [react-query](https://react-query.tanstack.com/) - REST + GraphQL
- [swr]() - REST + GraphQL
- [apollo client]() - GraphQL
- [urql]() - GraphQl

[Server State Example Code](../src/features/users/api/getUsers.js)

## Form State

This is a state that tracks users inputs in a form.

Forms in React can be [controlled](https://reactjs.org/docs/forms.html#controlled-components) and [uncontrolled](https://reactjs.org/docs/uncontrolled-components.html).

Depending on the application needs, they might be pretty complex with many different fields which require validation.

Although it is possible to build any form using only React, there are pretty good solutions out there that help with handling forms such as:

- [React Hook Form](https://react-hook-form.com/)
- [Formik](https://formik.org/)
- [React Final Form](https://github.com/final-form/react-final-form)
