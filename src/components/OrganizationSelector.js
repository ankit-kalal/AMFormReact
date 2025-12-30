/**
 * Organization Selector Component
 * Displays organization dropdown in sidenav matching the theme design
 */

import { useEffect, useState, useRef } from 'react';
import { useAuth } from 'context/AuthContext';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchOrganizations, setSelectedOrganization } from 'store/slices/organizationsSlice';
import SidenavCollapse from 'examples/Sidenav/SidenavCollapse';
import SidenavList from 'examples/Sidenav/SidenavList';
import SidenavItem from 'examples/Sidenav/SidenavItem';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import CircularProgress from '@mui/material/CircularProgress';
import Icon from '@mui/material/Icon';
import { useMaterialUIController } from 'context';

function OrganizationSelector({ icon, name = "Organization", color = "info" }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const dispatch = useAppDispatch();
  const { list: organizations, loading: isLoadingOrgs, error, selectedOrganization } = useAppSelector((state) => state.organizations);
  const { session } = useAuth();
  const [open, setOpen] = useState(false);
  const hasFetchedOrgs = useRef(false);
  const dropdownRef = useRef(null);

  // Fetch organizations when component mounts
  useEffect(() => {
    if (session && organizations.length === 0 && !isLoadingOrgs && !hasFetchedOrgs.current) {
      hasFetchedOrgs.current = true;
      dispatch(fetchOrganizations(session));
    }
  }, [dispatch, session, organizations.length, isLoadingOrgs]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleOrganizationChange = (org) => {
    dispatch(setSelectedOrganization({
      id: org.id,
      name: org.name
    }));
    setOpen(false);
  };

  const renderDropdownItems = () => {
    if (isLoadingOrgs) {
      return (
        <SidenavList>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <CircularProgress size={20} />
            <MDTypography variant="caption" sx={{ ml: 1 }}>
              Loading...
            </MDTypography>
          </MDBox>
        </SidenavList>
      );
    }

    if (error) {
      return (
        <SidenavList>
          <MDBox sx={{ padding: 2 }}>
            <MDTypography variant="caption" color="error">
              Error: {error}
            </MDTypography>
          </MDBox>
        </SidenavList>
      );
    }

    if (!organizations || organizations.length === 0) {
      return (
        <SidenavList>
          <MDBox sx={{ padding: 2 }}>
            <MDTypography variant="caption" color="text">
              No organizations available
            </MDTypography>
          </MDBox>
        </SidenavList>
      );
    }

    return organizations.map((org) => (
      <SidenavList key={org.id}>
        <SidenavItem
          color={color}
          name={`${org.name} (${org.code})`}
          active={selectedOrganization?.id === org.id}
          nested={true}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOrganizationChange(org);
          }}
        />
      </SidenavList>
    ));
  };

  return (
    <MDBox ref={dropdownRef}>
      <SidenavCollapse
        name={selectedOrganization?.name || name}
        icon={icon}
        active={false}
        open={open}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open);
        }}
        children={open ? renderDropdownItems() : null}
      />
    </MDBox>
  );
}

export default OrganizationSelector;

