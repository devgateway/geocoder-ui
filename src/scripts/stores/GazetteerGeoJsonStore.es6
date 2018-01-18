import Reflux from "reflux"
import GazetteerStore from './GazetteerStore.es6'
import { GeoJsonBuilder } from '../util/GeojsonBuilder.es6'

const initialState = {
  data: undefined,
  autoZoom: true
}

class GazetteerGeoJsonStore extends Reflux.Store {
  constructor() {
    super()

    this.state = initialState
    this.listenTo(Reflux.initStore(GazetteerStore), this.process)
  }

  process(data) {
    if (data.loadingLocations) {
      this.loading = true
    } else if (data.loadingLocations == false && this.loading == true) {
      this.loading=false
      
      let newData

      if (data.locations && data.locations.total > 0) {
        let featureCollection =
          new GeoJsonBuilder({
            type: 'Point',
            coordinates: function() {
              return [this.lng, this.lat]
            }
          }).build(data.locations.records)

        newData = Object.assign(this.state, { data: featureCollection, autoZoom: true })
      } else {
        newData = { data: undefined, autoZoom: true }
      }
      this.setState(newData)
    }
  }
}

export default GazetteerGeoJsonStore
