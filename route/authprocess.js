const MD = require("../models/item_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const defaultava = [
  "data:image/jpeg;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABgAAAAAQAAAGAAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAACADAAADoAQAAQAAACADAAAAAAAA/+EOA2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDIzLTEwLTI4PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjI0NzlhZWRiLWRiYWQtNGI1MS1iYTUyLWFkYzc2ZGQzZDhjODwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5hdmF0YXItdHJhbmcgLSBhdmF0YXItdHJhbmctMjwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6cGRmPSdodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvJz4KICA8cGRmOkF1dGhvcj5Cw7lpIERp4buHdSBRdeG6vzwvcGRmOkF1dGhvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhPC94bXA6Q3JlYXRvclRvb2w+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAyADIAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APX6KKK6TYKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKTNFAC0UUUAFFJS0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFNxmmgHUUnUcUnJoYrjqSk9x+tTQ2803+qiZvoMUuZILkVLWlHot645TZn1NWovDkrD95Mq/Tmpc0LmRhUDrXSL4cQHDTEn6YqQeH4B1dqPaIOZHMUldQfD0J6SGo28Oqfuzn/AL5/+vR7RBzI5uit6Xw5KPuS7vqMVUm0S9Q/cDj2o50HMjMoqWe2mhO2WN0PowzUR9OAaq6Y00xaKRfvYNB60xi0UUUgCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKSgBaTntSmigBAck47UgPrwPepra3muHCwqTnrW/ZaAiANdNuP92pc0iW7GBb201x/qY2PvWxZ+HpWAa4fA9BXRRQRQqBCoUVJ06Vk6hk56mfbaTaQAYiDH1aryoi8KoFOPNArNyuJyuHPrR9eaKKQhQBRSUtABSUuaSgAo+tFFACNGrKQwBB9qoXGkWkoP7vaT3FaOaQ9apTaHc5m68PSLlreQEf3TWPcW81ucSxke+OK74+v8qjmhSYFZUDL9KpVe5SmcADkcHNFdNf6DG4LWx2Hrtrnri3lt3KyKVA9a2jJMtTTI6QUHikbg1e5YopaTpS0gCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKSloAKQgE0tKkZldUjBLH0p6LcVxMfw9a1tN0Z7hQ8+Vj9K0NJ0dIcSXIJbsPStxQMYwOOlYymZtkFtaxWyBYkH1qY9adikxWDbZncOwooooAKKKKBBRRRQMKKKKACiiigAooooAKKKKQgooopgJnnrzUVzbRXEZSVQc96mo+lCbQ1ocnqWjSQEvB80XpWQOTjBGPWvQwoweKw9X0ZZv3kGFcdVHetoTNYzOX7nFKDTpY2hdkcFT6Gmc+lbrUtO46ikFLSGFFHaimAUUUUgCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooATNGaDTokaRgqDJPQUJWE9BYo3mlEcakue1dZpGmJaRB3AMpp2j6alpGHfBuD1PtWkRznqa55zuZTlcOuOTQOtFFZ6sz1FzSUUUDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKBC0h/UdDRRRcd7GZrGmpeRF1AWUD865KeJoTskBDCu/PSszWNNW7jLoMTAVtTmawkcgOtGaWSNo5WV/vLTc5FdHMmXzXHZ4opBS0hhRRRSAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmng0poI4zQArA4HcnpXTeH9NESCeYZc8is7QNPNzN5kg/dryK6xRtGAMCsakjKbF9TRR9aKxMwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAClpKXNAAaQfrRRQCMPXtMWVTcQ/eHUVy567ehr0MqDkY4PUVyWv2H2acSIP3be3StqcjSLMrByPSlpB1Jzx2pa3NWFFFFIAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoopKACpIIWnmSNeQ/pUXPaui8N2mSbl1+XooNTJ2E3Y27K2W2t1jTsOanPtRRXM3c527hRRRSAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKBRRQAVXvoFuYGicfeHFWKD096cXYEzgbiFred4mzhTgVHXQ+JbPG24QcA4auc5xjuDn8K6lK6OhPQdRRRTGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFHfnvRR3FAD7eIzTJEOS7bfwrubWBbe2jiA+6MVzXha38y7aYjOz+ddXjr781hUZlNhRRRWJmFFFFMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKQiG7gFxbvE3RhiuGnjNvM8ZHKnA+ld+DjkjpXL+KLcRXSyqMK4ranIuDZi0UHpSVubi0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUn060tOgXfMigckgUMTOs8OweTYgkcuc1q1HAgjiRAMAKKfXJN3ZzvcU0lFFIAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiihAg6kVma/B52nscZZTkVpnoaZMgkidT3FOLsOLsefmgU+dCk0iEfdY/zpneurc3FooopjCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoopDQAVf0aPzL+MehzVAVseF03Xxb0FKeiIkzqx056iij1oFcfmY9QooooAKKKKYBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAB6cUvGelJRQBxWtxmPUpQOA3Iqj6Z9K2PFS4vQw7qKxxkcGuqD906IhS0UVQwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKTNAgrf8ACI/eXB9hWBiuh8JDm5/CpqfCTI6EcUoo/pRXJ0MeoUUUUAFFFFMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKBBRS0YoGc14sHzW5+tYFdF4s/5YD61zo6V1Q+E3iLRRRVdCgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKSlpKGIWug8JHm4/Cufrd8Jt++nX1FTP4SXsdLRSd/oKWuTqYdQooopjCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKBC0ZpKKBo53xaf+Pf8AGuerd8WNma3T6msIc811Q+E6Ii0UUVS2AKKKKBhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABSYpaKYCHitfwzIFv8dmFY5PHtV3SpPKv4T0GcUpq6JlsdsO1LR1+lFcfUw6hRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUZoA5PxRJnUAOyrxWQOgq5q0pm1KX0zgVTHU/WuuHwm8RaKKKZQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFADT92nxnbKDnoQabS+o9eaGxNXO8tJfOtonHTbU1Y/hu4EtiUzyprYzgVyyWpg1YKKU0lSIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooopMAPSoryTybaR/RalP8qyfEcwisAmfmc1UdQSucm7F5Xc9WJNIOOKKWuqOisdC0CiiimMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKK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Dx/SoqTuTKWooopM0uayZLE6/QVQ1e9FpaM3G8/dFXbiVYYWdzgKPzriNSu2vLlmLfuwcAVcIDjEquzSSF5Dlm5ooAAORS11LY3SsFFFFIAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkPSlooAaAQeevYVteH9R8iUQyH923TPasajOGBB5pSjcTPRMgkEdO1FYugagLiMQyt+8XpWyOSeOBXNKNjFqwEZpjhXUrIMoetSUhz6DFSl1JOP1nT2tJy6gmN+ntWp4WEi2kgcEAcjNbUsaTLiRQy0JGI12qAE9q059LFuV1Yf3oPWge2aWsyBDUN1BFcwmOUZGKnppGRimnYL2OG1G0ezmZHHyk/KaqMOBXc6jZrewFSAXXoTXKXem3VoCXG5T3FdEKlzaLKdFN4+7nkU71qygpuad2o68Dk+gp3sMQ5zScVetNNubphsQop7tW7Z6DDDgzsHb07VDqJEuSRzMUUkrhY4y3vitS20G4lOXZYx+tdPDBFEuI4wvvUlZyqEOdzHt9BtYjmTdI3vWlFaxRDEcar+FTilrJybIuNUccH86D06U6kNK4riZzil7UlFA7hRiiigQYoxRRQAhFKMUUUhBjHpQR6Y/GnUU7juVprSGYHzYlY1nXWg20vMZMZ9q2aWqUmh3ORutBuIeYWEg/WsyaGWJj5kTKfU9K7/oeDUcsMcqlZEVh71aqFKZ5+DnpTq6i60GCTJtyUasS8025tThkLD1FaqSZopJlGlpGBXrgH070nAx1H1qih1FFIR70XAGyBxVvTbR7yULHync0trptzdAeWuAe5rq9MsVsbcKMbz97FZudiHKxNaWyW8KpGOnU1M3XIpaDWEncxeolFBopAjE8UhzbIEBIzzgVkaNprXc4ZgRGvJz3rsHRXUq4DL6GkijWNQI1Cj0FWp20LUrCoqoihRhAMYp1OorMh6jaCcAk0p/8A1Vi6/qH2eIxRHMh61cYtsaVzP8Rah5snkwn5R196xRggY6UFtx5OTRXVGNkbxjYKWiigdwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoopKACggHrR0oGSwABJbgU72QnoOjlaGQOjbGFdrpV0Lu0WQdQMNWbpmhxiISXXzOeQK2oYI4E2QrtU8muecrmUpXJO1HWjPHNFYoi3UPpRRRRcVwpc0lFMYuaMZpKWi1xMWmSIrqQwyp7U7NFC0GnY5PXdM+yuJohmM9RWMGJGe1d/cRrNE6MMgjH0rhruBra4khbqp6e1dNOdzaDuS6dYy30u1GAXGTxXTWWk29uoJXfJ6muc0W5MF/Gc4UkA12uQecVFRsUhQAAABgelGB6UAYorFmLCiiilYLhS5pKKBi5pKKKYBRRRQAUUUUAFFFFABRRRQAuaM0lFAC5ozSUUAFFFFAAeaCARzzmilPSi7Qaozb3SLe4UkIFk9RXMalYSWUn7xw6n7vrXcHGOe3NcVrVyLm+cqflHAFbU22aU3coAnvWvoWmm5k82RT5Y6Cs2zha4uIkXksc49q7u3iWGIIgwAKdRlTY9UVFCooCjtSgYoJziisGZPUWkoooEFFFFAgxRiiigBc0UlLmgZU1S5W1tWkPXoPrXESyvPIXkOWJyfpXe3ESTpslUFT61ialokflF7XKv3BrWnKxpF2OaPB4pRQylXZW4ZetArovc0TuLRRRSGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFHWikOMHPSgAwOjcelaGjWkkt7HIUOxfXvVnQdLE5E8wJQdFPeunRERQI1Cj0rKcyJSsPH3s0ppBxRXOYhRRRTAKKKKACiiigAooooAKKKKADt9a5nxXAqSpOozuHNdNWX4hj8zTnwOQc5q6bsyoaHIgkOCvUc13OnTCeyhk9Rg1wo5O78K6vwzJu08oTkq3FaVdjSRsUUCisOhgFFFFAwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAp1NpaAK+ozeRZTSZ6LXBkk7ifvHmut8Sy7bDZ/ePNciM5yfpXRRWlzWCN3wvCGmeUj7gwPxrp6yfDkPlWCsRy53ZrXHIrKbuyJ7gaSlNJUEhRRRQAUUUUAFFFFABRRRQAUEAnB6GlFBFAXON1yzkiu5HCkqT1FZvHbtXoUiq6EMoYHqDXL65pQgzcQ8KeoFdEJ6WNoSvoY1FJ2+vNLWiZYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUhGQQaWkPShgdxpGBZQY6batnrWdoEqy6dGB1XitHtXLNWMJhRRRUkBRRRQMKKKKACiiigAooooAKKKKACqupLvsZ17leKtVDdjNpN9KcNxrc4L1x0ro/Chys6ntzXNnjP1roPCR/eXI9h/St6msTWex0g6Cij0orn6GAUUUUDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAClpKUUAc94rbCwr61zmcE+ldB4uPz23+fWufH3vxrqpfCbQ2O40pSthbqcZCVc6Cq9j/AMekGP7lTj0rle5k9Rc5FJQetFAmFFFFAgooooGFFFFABRRRQAtGaSijoAdetVdSUGwn3AYC5q1WfrsyxadJnq3FVC5UdDjB/D9KWk6dKK6VojdbC0UUUwCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKB1oA2fDFz5dwbdzhW5rqR6V57A7o4cHDKa7jTrlbq1R1weMGsakTKaLVFA6+1LisDISiiimAUUUUDCiiigAooopAFFFFAgFVtQYJZTMf7tWR+lZXiGcRacw/vnFVDcqO5yGdxb3NdF4TTmdux4/lXO9M46Diut8NQmOw3PwWORW8/hNZ7GxQKPWjpXPuYC02lzSUDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAChulFB5oA53xYpIgbsK548EGus8SxF7EMoyVP6VySHNdVP4TaD0sd3pjbrGFvVatDpzWT4cmElioyCE4rW/GueS1MhKKKKkTCiiigQUUUUDCiiigAoopcUAAooooAT+Y4rl/E10JJRbIchetb99cra2zyOe2B71w8ztJI0jHljmtqaNIobjgE9elFB65pa2NQooooEFFFFAwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKDRRQAmfmFaeiX32W4Ck/u3/Ss2k7jnBqZK5LVz0MFdoIOQeQaXNc9oOqZHkTHkdCa6BW4JPQ1hKNjJxsFFAor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ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAHHSkIpaKVwsHfvTWjVvvKpH0p1LRdjuyA2dueTChPqRT0hjT7qKPwqSindhdgfbAoHFFIaWogprLu4YAj0p1FF7ME7HF6zZfY7w7fuN0NZ6/d5GD6V2+s2YvLNx/GOQa4tgVyG4YcGumErm0Xcb2paTtS1oWFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAIaBx1oY4FKil22qOT0oTsBreG7Tz7sySD5E5WusqnpNqLS0RMfM3Jq5nOa56krswm7hRRRWZIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFGKKKAFFLTaXNIQmcEZ6VyfiO0MVz5qD5G5JrrO2Kqalai7spI+4GRWkHZmkXZnD/SloZSj7CDleDSd66UbboWikpaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAQ9h1rV8O232i883GVTn61ktnt1PFdloFt9n09SRh25NZzZMnY0hkN6g/pRRRXOc71CiiigYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQIKB3HtRR1OKB3OR8QWnkXnnAYSQVlZ5NdlrtuLiwPGWTkfSuMHVuxFdVOV1Y3i7iilpBnvS1digooopAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFJ+NKOaaetAFrToTdXkUeOM5P0ruUUIgUdq53wvb7mlnbGR8q10YrnqSuzGbFxRRmisyBKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAClFJS0CEZAwII4IxXC6pAYL2WM+uR9K7vNc34pgC+VMPvHgmtaT1NIM5/HNLQTxSA5NdLNhaKKKkAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAWkIyR78UCpLZDLcQxgdWobshN2R2GiQCHT4vVhk1fpI1CIqD+EAUprje5g9wooooEFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRSAXtWfrUHnafID1XkVoCmSDfEynuKqDsxx3PPiMNij2qa7jMVzIh9TUWO9dSloboKKKKYwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBMVpeHovM1IE9EGazq3vCqczSY7YzUy2JkdKOO+aSlPWkrle5gFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUgCj0oopoa0OQ8Rx+XqJPZwMVl10XiyLKwyY6cZrnSOc+tdMNUbR1QtFFFWUFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUhoAWuq8NR7LDd/fauTz8pPeu30dQmm2+30z+tZ1NiJMu0dqBRXOYhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFIQU6m0uaaAyfEqb9NJ/usDXI55/Wu21pQ+mTg/3c1xOBgHvXRTdzeD0ClpueadWpYUUUUgCiiigAooooAKKKKACiiigAooooAKKKKAP/2Q=="
]
const auth = () => {
  return new Promise(async (res, rej) => {
    try {
      await MD.Register.find({})
        .then((data) => {
          res({ status: true, data: data });
        })
        .catch((err) => {
          rej({ status: false });
        });
    } catch (error) {
      rej({ status: false, mes: "ERR" });
    }
  });
};

// const addUser = (username, password, email, name, role) => {
//   return new Promise(async (res, rej) => {
//     try {
//       if (role == null || role != "admin") {
//         role = "user";
//       }
//       let user = new MD.Register({
//         username: username,
//         password: password,
//         email: email,
//         name: name,
//         role: role,
//       });
//       user
//         .save()

//         .then((data) => {
//           console.log(data);
//           res({ status: true });
//         })

//         .catch((err) => {
//           console.log(err);
//           rej({ status: false });
//         });
//     } catch (error) {
//       rej({ status: false, mes: "err" });
//     }
//   });
// };

const addUser = (username, password, email, name, role) => {
  return new Promise(async (res, rej) => {
    try {
      var check = await MD.Register.findOne({username: username}) 
      if (!check) {
        if (role == null || role != "admin") {
          role = "user";
        }
        let user = new MD.Register({
          username: username,
          password: password,
          email: email,
          name: name,
          role: role,
          avatar: defaultava[0]
        });
        user
          .save()
          .then((data) => {
            res({ status: true, message:"User added!" });
          })

          .catch((err) => {
            console.log(err); 
            rej({ status: false });
          });
      }else{
        res({status:false, message: "This username or email have been used!"})
      }
    } catch (error) {
      rej({ status: false, mes: "err" });
    }
  });
};

const upload = (base64) => {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await MD.Register.create({ image: base64 })
        .then((img) => {
          if (img) {
            resolve({ status: true });
          }
        })
        .catch((err) => {
          resolve({ status: false });
        });
    } catch (error) {
      reject({ status: false, ERR: error });
    }
  });
};

const Login = (username, pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      await MD.Register.findOne({ username: username })
        .then(async (user) => {
          if (user) {
            let isValid = await bcrypt.compare(pass, user.password);
            if (!isValid) {
              resolve({ status: false, mes: "Sai mật khẩu" });
              next()
            } else {
              const token = jwt.sign(
                {
                  id: user.username,
                  admin: user.role,
                },
                "MySecretKey",
                { expiresIn: "10s" }
              );
              const refreshToken = jwt.sign(
                {
                  id: user.username,
                  admin: user.role,
                },
                "MyRefreshSecretKey",
                { expiresIn: "30d" }
              );
              const { password, ...others } = user._doc;
              resolve({
                status: true,
                mes: "Đăng nhập thành công",
                ...others,
                token: token,
                rft: refreshToken,
              });
            }
          } else {
            resolve({ status: false, mes: "Không có username này" });
            next()
          }
        })
        .catch((err) => {
          reject({ status: false, mes: "DB ERR" });
        });
    } catch (error) {
      reject({ status: false, mes: err });
    }
  });
};

const UpdateImage = (username, base64) => {
  return new Promise(async (resolve, reject) => {
    try {
      await MD.Register.findOneAndUpdate(
        { username: username },
        { avatar: base64 }
      )
        .then((user) => {
          if (user) {
            resolve({ status: true, data: user });
          } else {
            resolve({ status: false });
          }
        })
        .catch((err) => {
          reject({ status: false });
        });
    } catch (error) {
      reject({ status: false, mes: "ERR" });
    }
  });
};

const getImage = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      await MD.Register.findOne({ username: username })
        .then((user) => {
          if (user) {
            resolve({ status: true, data: user });
          } else {
            resolve({ status: false });
          }
        })
        .catch((err) => {
          reject({ status: false });
        });
    } catch (error) {
      reject({ status: false, mes: "ERR" });
    }
  });
};

const deleteUser = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(username);
      await MD.Register.findOneAndDelete({ username: username })
        .then((data) => {
          console.log(data);
          resolve({ status: true, data: data });
        })
        .catch((err) => {
          reject({ status: false });
        });
    } catch (error) {
      reject({ status: false, mes: "ERR" });
    }
  });
};

const changePassword =(username,password,checkpassword)=>{
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await MD.Register.findOne(
        { username: username }
      )
        .then(async(user) => {
          let isValid = await bcrypt.compare(checkpassword, user.password);
            if (!isValid) {
              resolve({ status: false, mes: "Sai mật khẩu" });
            }else{ 
              await MD.Register.findOneAndUpdate({username:user.username},{password:hashPassword})
              .then((usr)=>{
                resolve({status:true, mes: "Successful"})
              }).catch((err)=>{
                reject({status:false, mes:"Update failed"})
              })
            }
        })
        .catch((err) => {
          reject({ status: false });
        });
    } catch (error) {
      reject({ status: false, mes: "ERR" });
    }
  });
}

module.exports = {
  auth,
  addUser,
  Login,
  upload,
  UpdateImage,
  getImage,
  deleteUser,
  changePassword
};
