export function prettyServerSideError(message) {
    // add a check to  ensure that theres a period, or other ! or ? at the end before appending
    return message.charAt(0).toUpperCase() + message.slice(1) + '.';
}