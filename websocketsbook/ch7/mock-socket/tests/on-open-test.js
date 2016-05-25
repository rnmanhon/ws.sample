module('Mocksocket onopen tests');

asyncTest('that the mocksocket onopen function is called after mocksocket object is created', function() {
  var socketUrl  = 'ws://localhost:8080';
  var mockServer = new MockServer(socketUrl);
  var mockSocket = new MockSocket(socketUrl);

  expect(3);

  mockSocket.onopen = function(event) {
    ok(true, 'mocksocket onopen fires as expected');
    equal(this.readyState, MockSocket.OPEN, 'the readystate is correct set to open');
    equal(event.currentTarget.url, urlTransform(socketUrl), 'onopen function receives a valid event obejct');
    start();
  };
});


asyncTest('that the mock server connection function is called after mocksocket object is created', function() {
  var socketUrl  = 'ws://localhost:8080';
  var mockServer = new MockServer(socketUrl);
  var mockSocket = new MockSocket(socketUrl);

  expect(1);

  mockServer.on('connection', function() {
    ok(true, 'mock server on connection fires as expected');
    start();
  });
});


asyncTest('that the mock server connection function is called after mocksocket object is created', function() {
  var semaphore  = false;
  var socketUrl  = 'ws://localhost:8080';
  var mockServer = new MockServer(socketUrl);
  var mockSocket = new MockSocket(socketUrl);

  expect(2);

  mockServer.on('connection', function() {
    ok(!semaphore, 'The mock server\'s connection was called first before the onopen function');
    semaphore = true;
  });

  mockSocket.onopen = function(event) {
    ok(semaphore, 'The onopen function was called second after the mock server\'s connection function');
    semaphore = true;
    start();
  };
});
