import { useEffect, useState, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface LittleExplorerMarkerProps {
  position: [number, number] | null;
  avatarType: 'boy' | 'girl';
  onArrival?: (countryName: string) => void;
}

export function LittleExplorerMarker({ position, avatarType, onArrival }: LittleExplorerMarkerProps) {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);
  const [isWalking, setIsWalking] = useState(false);
  const previousPosition = useRef<[number, number] | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!map.getPane('avatar')) {
      const avatarPane = map.createPane('avatar');
      avatarPane.style.zIndex = '400';
    }

    const style = document.createElement('style');
    style.innerHTML = `
      .little-explorer-marker {
        background: transparent !important;
        border: none !important;
      }

      @keyframes idle-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }

      @keyframes walk-cycle {
        0%, 100% { transform: translateY(0) scaleX(1); }
        25% { transform: translateY(-3px) scaleX(1.02); }
        50% { transform: translateY(0) scaleX(0.98); }
        75% { transform: translateY(-3px) scaleX(1.02); }
      }

      .idle-bounce {
        animation: idle-bounce 2s ease-in-out infinite;
      }

      .walking {
        animation: walk-cycle 0.4s ease-in-out infinite;
      }

      @keyframes wave {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-15deg); }
        75% { transform: rotate(15deg); }
      }

      .little-explorer-avatar:hover {
        animation: wave 0.5s ease-in-out 2;
      }

      .explorer-moving-left {
        transform: scaleX(-1);
      }

      .explorer-avatar-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    `;

    if (!document.getElementById('little-explorer-styles')) {
      style.id = 'little-explorer-styles';
      document.head.appendChild(style);
    }

    return () => {
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
        markerRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [map]);

  useEffect(() => {
    if (!position) return;

    const avatarImageUrl = avatarType === 'boy'
      ? '/ChatGPT_Image_Nov_25__2025__05_35_41_PM-removebg-preview.png'
      : '/ChatGPT_Image_Nov_25__2025__05_32_19_PM-removebg-preview.png';

    const createIcon = (walking: boolean, movingLeft: boolean) => {
      const iconHtml = `
        <div class="little-explorer-container" style="
          width: 80px;
          height: 80px;
          position: relative;
        ">
          <div class="little-explorer-avatar ${walking ? 'walking' : 'idle-bounce'} ${movingLeft ? 'explorer-moving-left' : ''}" style="
            width: 100%;
            height: 100%;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
          ">
            <img src="${avatarImageUrl}" class="explorer-avatar-img" alt="Explorer" />
          </div>
        </div>
      `;

      return L.divIcon({
        html: iconHtml,
        className: 'little-explorer-marker',
        iconSize: [80, 80],
        iconAnchor: [40, 80],
        pane: 'avatar',
      });
    };

    if (!markerRef.current) {
      const newMarker = L.marker(position, { icon: createIcon(false, false) }).addTo(map);
      markerRef.current = newMarker;
      previousPosition.current = position;
      map.setView(position, 5);
    } else if (previousPosition.current &&
               (previousPosition.current[0] !== position[0] || previousPosition.current[1] !== position[1])) {

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      setIsWalking(true);

      const startLatLng = L.latLng(previousPosition.current[0], previousPosition.current[1]);
      const endLatLng = L.latLng(position[0], position[1]);
      const duration = 2000;
      const startTime = Date.now();
      const isMovingLeft = endLatLng.lng < startLatLng.lng;

      const animateMarker = () => {
        if (!markerRef.current) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const lat = startLatLng.lat + (endLatLng.lat - startLatLng.lat) * progress;
        const lng = startLatLng.lng + (endLatLng.lng - startLatLng.lng) * progress;
        const currentLatLng = L.latLng(lat, lng);

        markerRef.current.setLatLng(currentLatLng);
        markerRef.current.setIcon(createIcon(true, isMovingLeft));

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animateMarker);
        } else {
          setIsWalking(false);
          previousPosition.current = position;
          if (markerRef.current) {
            markerRef.current.setIcon(createIcon(false, false));
          }

          if (onArrival) {
            onArrival('');
          }
        }
      };

      map.flyTo(position, 5, {
        duration: duration / 1000,
        easeLinearity: 0.5,
      });

      animationFrameRef.current = requestAnimationFrame(animateMarker);
    } else if (markerRef.current) {
      markerRef.current.setIcon(createIcon(false, false));
    }
  }, [position, avatarType, map, onArrival]);

  return null;
}
