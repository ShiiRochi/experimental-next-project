import { useCallback, useMemo, useRef, useState } from 'react';
import { WaveSurfer, WaveForm, Region, Marker } from 'wavesurfer-react';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min';
import MarkersPlugin from 'wavesurfer.js/src/plugin/markers';

export default function Wavesurfer({ id }) {
  const waveformId = 'waveform' + '-' + id;
  const timelineId = `timeline-${id}`;

  const plugins = useMemo(() => {
    return [
      {
        plugin: RegionsPlugin,
        options: { dragSelection: true },
      },
      {
        plugin: TimelinePlugin,
        options: {
          container: '#' + timelineId,
        },
      },
      {
        plugin: MarkersPlugin,
        options: {
          markers: [{ draggable: true }],
        },
      },
    ];
  }, [timelineId]);

  const [regions, setRegions] = useState([
    {
      id: 'region-1',
      start: 0.5,
      end: 10,
      color: 'rgba(0, 0, 0, .5)',
      data: {
        systemRegionId: 31,
      },
    },
    {
      id: 'region-2',
      start: 5,
      end: 25,
      color: 'rgba(225, 195, 100, .5)',
      data: {
        systemRegionId: 32,
      },
    },
    {
      id: 'region-3',
      start: 15,
      end: 35,
      color: 'rgba(25, 95, 195, .5)',
      data: {
        systemRegionId: 33,
      },
    },
  ]);

  const [markers, setMarkers] = useState([
    {
      time: 5.5,
      label: 'V1',
      color: '#ff990a',
      draggable: true,
    },
    {
      time: 10,
      label: 'V2',
      color: '#00ffcc',
      position: 'top',
    },
  ]);

  const wavesurferRef = useRef(null);

  const onWaveSurferMount = useCallback((waveSurfer) => {
    if (waveSurfer.markers) {
      waveSurfer.clearMarkers();
    }

    wavesurferRef.current = waveSurfer;

    if (wavesurferRef.current) {
      wavesurferRef.current.load('/audios/1.mp3');

      // wavesurferRef.current.on('region-created', regionCreatedHandler);

      wavesurferRef.current.on('ready', () => {
        console.log('WaveSurfer is ready');
      });

      wavesurferRef.current.on('region-removed', (region) => {
        console.log('region-removed --> ', region);
      });

      wavesurferRef.current.on('loading', (data) => {
        console.log('loading --> ', data);
      });

      if (window) {
        window.surferidze = wavesurferRef.current;
      }
    }
  }, []);

  return (
    <WaveSurfer plugins={plugins} onMount={onWaveSurferMount}>
      <WaveForm id={waveformId}>
        {regions.map((regionProps) => (
          <Region
            onUpdateEnd={() => {}}
            key={regionProps.id}
            {...regionProps}
          />
        ))}
        {markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              {...marker}
              onClick={(...args) => {
                console.log('onClick', ...args);
              }}
              onDrag={(...args) => {
                console.log('onDrag', ...args);
              }}
              onDrop={(...args) => {
                console.log('onDrop', ...args);
              }}
            />
          );
        })}
      </WaveForm>
      <div id={timelineId}></div>
    </WaveSurfer>
  );
}
