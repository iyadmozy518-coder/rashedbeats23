const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssmgbttiafgbpgstovbj.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;