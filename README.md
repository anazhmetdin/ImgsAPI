# [ImgsAPI](https://github.com/anazhmetdin/ImgsAPI) - [[app]](https://imgsapi.up.railway.app/)

Here is an example of using this API:

[![click to open the api](https://imgsapi.up.railway.app/api/images?width=400&height=400&filename=fjord)](https://imgsapi.up.railway.app/api/images?width=400&height=400&filename=fjord)

Click this image to visit the API link. I've hosted this app on [railway.app](https://railway.app) so that it would be accessible.

* To view a list of the available API endpoints:

[https://imgsapi.up.railway.app/api/](https://imgsapi.up.railway.app/api/)

* To build this app:

```bash
npm run build
```

* To start this app:

```bash
npm run start
```

* To visit the hosted app on your local device:

  * Open the following link on the browser:
    * [localhost:3000/api/images](localhost:3000/api/images)
* To optain images, there must be three parameters

  * filename: [check [images](https://github.com/anazhmetdin/ImgsAPI/tree/main/images) folder to get list of available images]
  * width: positive integer
  * height: positive integer
* Example:

  * [localhost:3000/api/images?width=500&amp;height=400&amp;filename=fjord](localhost:3000/api/images?width=500&height=400&filename=fjord)
* All images are inside the [images](https://github.com/anazhmetdin/ImgsAPI/tree/main/images) folder and the cached images are stored inside [thumbs](https://github.com/anazhmetdin/ImgsAPI/tree/main/thumbs)
