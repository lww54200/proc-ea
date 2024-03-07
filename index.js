import tslib from 'tslib'

var endsWith = function (subjectString, searchString) {
  var position = subjectString.length;
  position -= searchString.length;
  var lastIndex = subjectString.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};

var updateFromJson = function (path, map) {
  var content = fs.readFileSync(path, "utf8");
  var keyToSession = JSON.parse(content);
  var newSessions = {};
  for (var key in keyToSession) {
    var info = keyToSession[key]?.info;
    if (info) {
      info = JSON.parse(info);
    }
    newSessions[key] = {
      target: {
        host: keyToSession[key]["host"],
        port: parseInt(keyToSession[key]["port"]),
        requires_path_in_url: info?.requires_path_in_url,
        requires_path_in_header_named: info?.requires_path_in_header_named,
      },
    };
  }
  for (var oldSession in map) {
    if (!(oldSession in newSessions)) {
      delete map[oldSession];
    }
  }
  for (var newSession in newSessions) {
    map[newSession] = newSessions[newSession];
  }
};

export default updateFromJson
