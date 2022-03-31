import { ActionTree } from 'vuex'
import { TimelapseState } from './types'
import { RootState } from '../types'
import { SocketActions } from '@/api/socketActions'
import consola from 'consola'

export const actions: ActionTree<TimelapseState, RootState> = {
  /**
   * Reset our store
   */
  async reset ({ commit }) {
    commit('setReset')
  },

  /**
   * Make a socket request to init the timelapse component.
   */
  async init () {
    SocketActions.timelapseState()
  },

  async onSettings ({ commit }, payload) {
    commit('setSettings', payload)
  },

  async onLastFrame ({ commit }, payload) {
    commit('setLastFrame', {
      count: payload.framecount,
      file: payload.lastframefile
    })
  },

  async onEvent ({ commit }, payload) {
    switch (payload.action) {
      case 'newframe': {
        commit('setLastFrame', {
          count: parseInt(payload.frame),
          file: payload.framefile
        })

        break
      }

      case 'render': {
        let status

        switch (payload.status) {
          case 'started': {
            status = {
              status: 'started',
              count: payload.framecount,
              settings: {
                frameRate: payload.framerate,
                crf: payload.crf,
                pixelFormat: payload.pixelformat
              }
            }
            break
          }

          case 'running': {
            status = { status: 'running', progress: payload.progress }
            break
          }

          case 'success': {
            status = {
              status: 'success',
              frameCount: payload.framecount,
              fileName: payload.filename,
              printFile: payload.printfile,
              previewImage: payload.previewimage,
              message: payload.msg
            }
            break
          }

          default: {
            consola.warn('unhandled timelapse render status', payload)
            return
          }
        }

        commit('setRenderStatus', status)
        break
      }

      default: {
        consola.warn('unhandled timelapse event', payload)
        break
      }
    }
  }
}
