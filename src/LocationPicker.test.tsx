import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LocationPicker from './index';

// Mock @react-google-maps/api
jest.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children }: any) => <div data-testid="google-map">{children}</div>,
  Marker: ({ onDragEnd }: any) => (
    <div 
      data-testid="marker" 
      onClick={() => onDragEnd({ latLng: { lat: () => 1, lng: () => 2 } })} 
    />
  ),
  Circle: () => <div data-testid="circle">Circle</div>,
}));

// Mock google maps
global.google = {
  maps: {
    Geocoder: class {
      geocode(_: any, callback: any) {
        callback([{ formatted_address: 'Test Address' }], 'OK');
      }
    },
    GeocoderStatus: {
      OK: 'OK',
    },
  },
} as any;

describe('LocationPicker', () => {
  const defaultPosition = { lat: 0, lng: 0 };
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <LocationPicker
        defaultPosition={defaultPosition}
        onChange={onChange}
      />
    );
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
    expect(screen.getByTestId('marker')).toBeInTheDocument();
  });

  it('calls onChange on mount with default position', async () => {
    render(
      <LocationPicker
        defaultPosition={defaultPosition}
        onChange={onChange}
      />
    );

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        position: defaultPosition,
        address: 'Test Address',
      }));
    });
  });

  it('calls onChange when marker is dragged', async () => {
    render(
      <LocationPicker
        defaultPosition={defaultPosition}
        onChange={onChange}
      />
    );

    const marker = screen.getByTestId('marker');
    // Simulate drag end via click (mock implementation)
    fireEvent.click(marker);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        position: { lat: 1, lng: 2 },
        address: 'Test Address',
      }));
    });
  });
});
