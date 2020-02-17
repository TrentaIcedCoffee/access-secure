from setuptools import setup, find_packages
import acsecure as app

setup(
  name='django-acsecure',
  version=app.__version__,
  description='',
  long_description='',
  license='MIT',
  platforms=['OS Independent'],
  keywords='django, log, anti-spam',
  author='',
  author_email='',
  url='',
  packages=find_packages(),
  install_requires=[
    'requests>=2.22.0',
  ],
)