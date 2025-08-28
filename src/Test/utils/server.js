const { Server } = require('../../server.js');
const express = require('express');

function buildTestServer() {
  const server = new Server(express())
  return server
}

module.exports = { buildTestServer };